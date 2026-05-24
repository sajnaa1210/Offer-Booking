using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Willovate.Api.Data;
using Willovate.Api.Models;

namespace Willovate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlotsController : ControllerBase
    {
        private readonly WillovateDbContext _dbContext;

        public SlotsController(WillovateDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(OfferSlot slot)
        {
            var offer = await _dbContext.Offers.FindAsync(slot.OfferId);
            if (offer == null)
            {
                return BadRequest(new { message = "Offer does not exist." });
            }

            if (slot.SlotEnd <= slot.SlotStart)
            {
                return BadRequest(new { message = "Slot end time must be after start time." });
            }

            slot.Status = "Available";
            _dbContext.OfferSlots.Add(slot);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = slot.Id }, slot);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var slots = await _dbContext.OfferSlots.Include(s => s.Offer).ToListAsync();
            return Ok(slots);
        }

        [HttpGet("/api/offers/{offerId}/slots")]
        public async Task<IActionResult> GetOfferSlots(int offerId)
        {
            var slots = await _dbContext.OfferSlots
                .Where(s => s.OfferId == offerId && s.Status != "Cancelled")
                .ToListAsync();
            return Ok(slots);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, OfferSlot slot)
        {
            var existing = await _dbContext.OfferSlots.FindAsync(id);
            if (existing == null)
            {
                return NotFound();
            }

            if (slot.SlotEnd <= slot.SlotStart)
            {
                return BadRequest(new { message = "Slot end time must be after start time." });
            }

            existing.SlotStart = slot.SlotStart;
            existing.SlotEnd = slot.SlotEnd;
            existing.Capacity = slot.Capacity;
            existing.Status = slot.Status;
            existing.BookedCount = slot.BookedCount;

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _dbContext.OfferSlots.FindAsync(id);
            if (existing == null)
            {
                return NotFound();
            }

            _dbContext.OfferSlots.Remove(existing);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var slot = await _dbContext.OfferSlots.FindAsync(id);
            if (slot == null)
            {
                return NotFound();
            }

            return Ok(slot);
        }
    }
}
