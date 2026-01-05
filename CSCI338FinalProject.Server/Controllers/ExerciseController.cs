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

        [HttpPost]
        public async Task<IActionResult> Create(Exercise exercise)
        {
            _context.Add(exercise);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetExerciseById), new { id = exercise.Id }, exercise);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExercise(int id, Exercise exercise)
        {
            var updateExercise = await _context.Exercises.FindAsync(id);
            if (updateExercise == null)
            {
                return NotFound();
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

        [HttpPost("{exerciseId}/sets")]
        public async Task<IActionResult> AddSet(int exerciseId, ExerciseSet exerciseSet)
        {
            var 
        }
    }
}
