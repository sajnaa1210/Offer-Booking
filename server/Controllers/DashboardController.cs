using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Willovate.Api.Data;

namespace Willovate.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly WillovateDbContext _dbContext;

        public DashboardController(WillovateDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> Summary()
        {
            var now = DateTime.UtcNow;
            var totalOffers = await _dbContext.Offers.CountAsync();
            var activeOffers = await _dbContext.Offers.CountAsync(o => o.Status == "Active" && o.EndDate >= now);
            var totalBookings = await _dbContext.Bookings.CountAsync();
            var todaysBookings = await _dbContext.Bookings.CountAsync(b => b.CreatedAt.Date == now.Date);
            var totalCapacity = await _dbContext.OfferSlots.SumAsync(s => (int?)s.Capacity) ?? 0;
            var bookedSeats = await _dbContext.OfferSlots.SumAsync(s => (int?)s.BookedCount) ?? 0;
            var availableSeats = Math.Max(totalCapacity - bookedSeats, 0);
            var conversionRate = totalCapacity > 0 ? Math.Round((double)bookedSeats / totalCapacity * 100, 2) : 0;

            var recentBookings = await _dbContext.Bookings
                .Include(b => b.Offer)
                .Include(b => b.Slot)
                .OrderByDescending(b => b.CreatedAt)
                .Take(8)
                .Select(b => new
                {
                    b.Id,
                    b.CustomerName,
                    OfferName = b.Offer != null ? b.Offer.Title : string.Empty,
                    SlotTime = b.Slot != null ? $"{b.Slot.SlotStart:yyyy-MM-dd HH:mm} - {b.Slot.SlotEnd:HH:mm}" : string.Empty,
                    b.PeopleCount,
                    b.Status
                })
                .ToListAsync();

            return Ok(new
            {
                totalOffers,
                activeOffers,
                totalBookings,
                todaysBookings,
                totalCapacity,
                bookedSeats,
                availableSeats,
                conversionRate,
                recentBookings
            });
        }
    }
}
