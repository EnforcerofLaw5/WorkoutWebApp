using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSCI338FinalProject.Server.Controllers
{
    public class ExerciseController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ExerciseController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAllExercises()
        {
            var exercises = await _context.Exercises.ToListAsync();
            return Ok(exercises);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExerciseById(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            return Ok(exercise);
        }

        [HttpPost("workouts/{workoutId}/exercises")]
        public async Task<IActionResult> Create(int workoutId)
        {
            var workout = await _context.Exercises.FirstOrDefaultAsync(w =>  w.Id == workoutId);
            if (workout == null) { return NotFound("Workout not found"); }
            var exercise = new Exercise
            {
                WorkoutId = workoutId
            };
            _context.Exercises.Add(exercise);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("{exerciseId}")]
        public async Task<IActionResult> AddToExercise(int exerciseId ,ExerciseSet exerciseSet)
        {
            var exercise = GetExerciseById(exerciseId);
            if (exercise == null)
            {
                return NotFound();
            }
            exerciseSet.ExerciseId = exerciseId;
            var added = _context.ExerciseSets.Add(exerciseSet);
            await _context.SaveChangesAsync();
            return Ok(added);
        }

        [HttpPut("workout/{workoutId}/exercises/{id}")]
        public async Task<IActionResult> UpdateExercise(int id, int workoutId, Exercise exercise)
        {
            var updateExercise = await _context.Exercises.Include(w => w.Workout).FirstOrDefaultAsync(e => e.Id == id && e.WorkoutId == workoutId);
            if (updateExercise == null)
            {
                return NotFound("Workout not found for this exercise");
            }
            updateExercise.PrimaryMuscle = exercise.PrimaryMuscle;
            updateExercise.Category = exercise.Category;
            updateExercise.Name = exercise.Name;
            await _context.SaveChangesAsync();
            return Ok(updateExercise);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            if (exercise == null) { return NotFound(); }
            _context.Remove(exercise);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
