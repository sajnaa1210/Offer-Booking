using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Willovate.Api.Data;
using Willovate.Api.Models;

namespace Willovate.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class BusinessController : ControllerBase
    {
        private readonly WillovateDbContext _dbContext;

        public BusinessController(WillovateDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Business business)
        {
            _dbContext.Businesses.Add(business);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = business.Id }, business);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var businesses = await _dbContext.Businesses.ToListAsync();
            return Ok(businesses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var business = await _dbContext.Businesses.FindAsync(id);
            if (business == null)
            {
                return NotFound();
            }
            return Ok(business);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Business business)
        {
            var existing = await _dbContext.Businesses.FindAsync(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.Name = business.Name;
            existing.BusinessType = business.BusinessType;
            existing.OwnerName = business.OwnerName;
            existing.Phone = business.Phone;
            existing.Email = business.Email;
            existing.Address = business.Address;
            existing.City = business.City;
            existing.LogoUrl = business.LogoUrl;
            existing.OpeningTime = business.OpeningTime;
            existing.ClosingTime = business.ClosingTime;

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
