using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSCI338FinalProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutExerciseController : ControllerBase
    {
        private readonly AppDbContext _context;
        public WorkoutExerciseController(AppDbContext context) => _context = context;

        [HttpGet("workout/{workoutId}")]
        public async Task<ActionResult<IEnumerable<WorkoutExercise>>> GetExercisesForWorkout(int workoutId)
        {
            var items = await _context.WorkoutExercises
                .Include(we => we.Exercise)
                .Where(we => we.WorkoutId == workoutId)
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutExercise>> GetWorkoutExercise(int workoutId)
        {
            var item = await _context.WorkoutExercises
                .Include(we => we.Exercise)
                .Include(we => we.Workout)
                .FirstOrDefaultAsync(x => x.Id == workoutId);

            if (item == null)
                return NotFound();

            return item;
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutExercise>> CreateWorkoutExercise(WorkoutExercise workoutExercise)
        {
            _context.WorkoutExercises.Add(workoutExercise);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWorkoutExercise),
                new { id = workoutExercise.Id }, workoutExercise);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkoutExercise>> DeleteWorkoutExerciseId(int workoutId)
        {
            var item = await _context.WorkoutExercises.FindAsync(workoutId);
            if (item == null)
            {
                return NotFound();
            }
            _context.WorkoutExercises.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }
    }
}
