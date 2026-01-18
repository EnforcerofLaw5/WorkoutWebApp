using CSCI338FinalProject.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSCI338FinalProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            List<Dtos.User> users = new List<Dtos.User>();
            var dbusers = await _context.Users.ToListAsync();
            foreach (var user in dbusers)
                users.Add(user.MaptoDto());
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.MaptoDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Dtos.User user)
        {
            var dbUser = await user.MapToModel(_context);
            _context.Users.Add(dbUser);
            await _context.SaveChangesAsync();
            user = dbUser.MaptoDto();
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Dtos.User user)
        {
            var dbUser = await user.MapToModel(_context);
            await _context.SaveChangesAsync();
			user = dbUser.MaptoDto();
			return Ok(user);
		}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) { return NotFound(); }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}