using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
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
            var workouts = await _context.Workouts.ToListAsync();
            return Ok(workouts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkoutById(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
                        return Ok(workout);
        }
         
        [HttpPost("users/{userId}")]
        public async Task<IActionResult> Create(int userId, Workout workout)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) { return NotFound("User not found"); }
            workout.UserID = userId;
            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("{workoutId}")]
        public IActionResult AddToWorkout(int workoutId, Exercise exercise)
        {
            var workout = GetWorkoutById(workoutId);
            if (workout == null)
            {
                return NotFound();
            }
            exercise.WorkoutId = workoutId;
            _context.Exercises.Add(exercise);
            _context.SaveChanges();
            return Ok(exercise);
        }

        [HttpPut("users/{userId}/workouts/{id}")]
        public async Task<IActionResult> UpdateWorkout(int id, int userId, Workout workout)
        {
            var updateWorkout = await _context.Workouts.Include(u => u.User).FirstOrDefaultAsync(w =>  w.Id == id && w.UserID == userId);
            if (updateWorkout == null) { return NotFound("User not found for this workout"); }
            updateWorkout.Type = workout.Type;
            updateWorkout.Notes = workout.Notes;
            updateWorkout.date = workout.date;
            updateWorkout.Name = workout.Name;
            await _context.SaveChangesAsync();
            return Ok(updateWorkout);
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
