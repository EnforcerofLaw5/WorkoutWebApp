using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;


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
            var workouts = await _context.Workouts.Include(w => w.WorkoutExercises).ThenInclude(e => e.Exercise).ToListAsync();
            return Ok(workouts);
        }

        [HttpGet("suggest/{userId}")]
        public async Task<ActionResult<Workout>> GetSuggestion(int userId, [FromServices] Suggestion svc)
        {
            var suggestion = await svc.SuggestWorkout(userId);
            return Ok(suggestion);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkoutById(int id)
        {
            var workout = await _context.Workouts.Include(w => w.WorkoutExercises).ThenInclude(e => e.Exercise).FirstOrDefaultAsync(i => i.Id == id);
            if (workout == null)
            {
                return NotFound();
            }
            return Ok(workout);
        }
         
        [HttpPost]
        public async Task<IActionResult> Create(Workout workout)
        {
            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkout(int id, Workout workout)
        {
            var updateWorkout = await _context.Workouts.FindAsync(id);
            if (updateWorkout == null)
            {
                return NotFound();
            }
            updateWorkout.Type = workout.Type;
            updateWorkout.Notes = workout.Notes;
            updateWorkout.date = workout.date;
            await _context.SaveChangesAsync();
            return Ok(updateWorkout);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var workout =  await _context.Workouts.FindAsync(id);
            if (workout == null) { return NotFound(); }
            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
            return Ok(workout);
        }
    }
}
