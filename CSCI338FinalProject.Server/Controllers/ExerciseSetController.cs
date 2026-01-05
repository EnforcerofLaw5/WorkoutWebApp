using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSCI338FinalProject.Server.Controllers
{
    public class ExerciseSetController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ExerciseSetController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAllExerciseSets()
        {
            var exerciseSets = await _context.ExerciseSets.ToListAsync();
            return Ok(exerciseSets);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExerciseSetById(int id)
        {
            var exerciseSet = await _context.ExerciseSets.FindAsync(id);
            return Ok(exerciseSet);
        }

        [HttpPost("exercises/{exerciseId}/sets")]
        public async Task<IActionResult> Create(int exerciseId)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(s => s.Id == exerciseId);
            if (exercise == null) { return NotFound("Exercise not found"); }
            var set = new ExerciseSet
            {
                ExerciseId = exerciseId
            };
            _context.ExerciseSets.Add(set);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("exercises/{exerciseId}/sets/{id}")]
        public async Task<IActionResult> UpdateExerciseSet(int id, int exerciseId, ExerciseSet exerciseSet)
        {
            var updateExerciseSet = await _context.ExerciseSets.Include(s => s.Exercise).FirstOrDefaultAsync(s => s.Id == id && s.ExerciseId == exerciseId);
            if (updateExerciseSet == null)
            {
                return NotFound("ExerciseSet not found for this exercise");
            }
            updateExerciseSet.RepsCompleted = exerciseSet.RepsCompleted;
            updateExerciseSet.Rpe = exerciseSet.Rpe;
            updateExerciseSet.WeightUsed = exerciseSet.WeightUsed;
            await _context.SaveChangesAsync();
            return Ok(updateExerciseSet);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExerciseSet(int id)
        {
            var exerciseSet = await _context.ExerciseSets.FindAsync(id);
            if (exerciseSet == null) { return NotFound(); }
            _context.Remove(exerciseSet);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
