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
         
        [HttpPost]
        public async Task<IActionResult> Create(Workout workout)
        {
            _context.Add(workout);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWorkoutById), new { id = workout.Id }, workout);
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
            var added = _context.Exercises.Add(exercise);
            _context.SaveChanges();
            return Ok(added);
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
