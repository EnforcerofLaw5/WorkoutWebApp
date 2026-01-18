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

        [HttpPost]
        public async Task<IActionResult> Create(ExerciseSet exerciseSet)
        {
            var added = _context.ExerciseSets.Add(exerciseSet);
            await _context.SaveChangesAsync();
            return Ok(added);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExerciseSet(ExerciseSet exerciseSet)
        {
            var updateExerciseSet = await _context.ExerciseSets.FirstOrDefaultAsync(s => s.Id == exerciseSet.Id);
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
