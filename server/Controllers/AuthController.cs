using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Willovate.Api.Data;
using Willovate.Api.Models;

namespace Willovate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly WillovateDbContext _dbContext;

        public AuthController(WillovateDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.PasswordHash == request.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            user.Token = Guid.NewGuid().ToString("N");
            await _dbContext.SaveChangesAsync();

            return Ok(new { token = user.Token, email = user.Email, name = user.Name, role = user.Role });
        }
    }
}
