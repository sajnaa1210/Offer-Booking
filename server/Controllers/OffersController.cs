using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Willovate.Api.Data;
using Willovate.Api.Models;

namespace Willovate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OffersController : ControllerBase
    {
        private readonly WillovateDbContext _dbContext;

        public OffersController(WillovateDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool activeOnly = true)
        {
            var query = _dbContext.Offers.Include(o => o.Business).Include(o => o.Slots).AsQueryable();
            if (activeOnly)
            {
                var now = DateTime.UtcNow;
                query = query.Where(o => o.Status == "Active" && o.EndDate >= now);
            }

            var offers = await query.OrderByDescending(o => o.CreatedAt).ToListAsync();
            return Ok(offers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var offer = await _dbContext.Offers.Include(o => o.Business).Include(o => o.Slots).FirstOrDefaultAsync(o => o.Id == id);
            if (offer == null)
            {
                return NotFound();
            }

            return Ok(offer);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(Offer offer)
        {
            if (offer.OfferPrice >= offer.OriginalPrice)
            {
                return BadRequest(new { message = "Offer price must be less than original price." });
            }

            offer.DiscountPercentage = offer.OriginalPrice > 0 ? Math.Round((offer.OriginalPrice - offer.OfferPrice) / offer.OriginalPrice * 100, 2) : 0;
            offer.CreatedAt = DateTime.UtcNow;
            offer.UpdatedAt = DateTime.UtcNow;
            _dbContext.Offers.Add(offer);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = offer.Id }, offer);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Offer update)
        {
            var existing = await _dbContext.Offers.FindAsync(id);
            if (existing == null)
            {
                return NotFound();
            }

            if (update.OfferPrice >= update.OriginalPrice)
            {
                return BadRequest(new { message = "Offer price must be less than original price." });
            }

            existing.Title = update.Title;
            existing.Description = update.Description;
            existing.Category = update.Category;
            existing.OriginalPrice = update.OriginalPrice;
            existing.OfferPrice = update.OfferPrice;
            existing.DiscountPercentage = update.OriginalPrice > 0 ? Math.Round((update.OriginalPrice - update.OfferPrice) / update.OriginalPrice * 100, 2) : 0;
            existing.StartDate = update.StartDate;
            existing.EndDate = update.EndDate;
            existing.TermsAndConditions = update.TermsAndConditions;
            existing.Status = update.Status;
            existing.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var offer = await _dbContext.Offers.FindAsync(id);
            if (offer == null)
            {
                return NotFound();
            }

            _dbContext.Offers.Remove(offer);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
