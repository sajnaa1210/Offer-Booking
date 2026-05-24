using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Willovate.Api.Data;
using Willovate.Api.Models;

namespace Willovate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly WillovateDbContext _dbContext;

        public BookingsController(WillovateDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Booking booking)
        {
            var offer = await _dbContext.Offers.FindAsync(booking.OfferId);
            var slot = await _dbContext.OfferSlots.FindAsync(booking.SlotId);
            if (offer == null || slot == null || slot.OfferId != booking.OfferId)
            {
                return BadRequest(new { message = "Invalid offer or slot." });
            }

            if (offer.Status != "Active" || offer.EndDate < DateTime.UtcNow)
            {
                return BadRequest(new { message = "Offer is not active or has expired." });
            }

            if (slot.Status != "Available")
            {
                return BadRequest(new { message = "Slot is not available." });
            }

            if (slot.BookedCount + booking.PeopleCount > slot.Capacity)
            {
                return BadRequest(new { message = "Capacity exceeded for this slot." });
            }

            var customerBookings = await _dbContext.Bookings
                .Where(b => b.CustomerPhone == booking.CustomerPhone && b.OfferId == booking.OfferId)
                .ToListAsync();
            if (customerBookings.Count >= offer.MaxBookingPerCustomer)
            {
                return BadRequest(new { message = "This phone number has already reached the maximum booking limit for this offer." });
            }

            booking.BookingReference = $"BOOK-{Guid.NewGuid():N}";
            booking.Status = "Pending";
            booking.CreatedAt = DateTime.UtcNow;
            _dbContext.Bookings.Add(booking);
            slot.BookedCount += booking.PeopleCount;
            if (slot.BookedCount >= slot.Capacity)
            {
                slot.Status = "Full";
            }

            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = booking.Id }, booking);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _dbContext.Bookings
                .Include(b => b.Offer)
                .Include(b => b.Slot)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
            return Ok(bookings);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var booking = await _dbContext.Bookings
                .Include(b => b.Offer)
                .Include(b => b.Slot)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        [Authorize]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, BookingStatusUpdate request)
        {
            var booking = await _dbContext.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            booking.Status = request.Status;
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
