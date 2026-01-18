using CSCI338FinalProject.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CSCI338FinalProject.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WorkoutController : ControllerBase
	{
		private readonly AppDbContext _context;
		public WorkoutController(AppDbContext context) => _context = context;

		[HttpGet]
		public async Task<IActionResult> GetAllWorkouts()
		{
			var workouts = new List<Dtos.Workout>();
			var dbWorkouts = await _context.Workouts.ToListAsync();
			foreach (var dbWorkout in dbWorkouts)
				workouts.Add(dbWorkout.MaptoDto());
			return Ok(workouts);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetWorkoutById(int id)
		{
			var workout = await _context.Workouts.FindAsync(id);
			return Ok(workout.MaptoDto());
		}

		[HttpPost]
		public async Task<IActionResult> Create(Dtos.Workout workout)
		{
			var dbWorkout = await workout.MapToModel(_context);
			_context.Workouts.Add(dbWorkout);
			await _context.SaveChangesAsync();
			return Ok(dbWorkout.MaptoDto());
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateWorkout(Dtos.Workout workout)
		{
			var dbWorkout = await workout.MapToModel(_context);
			await _context.SaveChangesAsync();
			return Ok(dbWorkout.MaptoDto());
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteWorkout(int id)
		{
			var workout = await _context.Workouts.FindAsync(id);
			if (workout == null) { return NotFound(); }
			_context.Remove(workout);
			await _context.SaveChangesAsync();
			return Ok();
		}
	}
}
