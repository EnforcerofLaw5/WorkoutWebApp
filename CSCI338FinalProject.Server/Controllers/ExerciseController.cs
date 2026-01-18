using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSCI338FinalProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            _context.Exercises.Add(exercise);
            _context.SaveChanges();
            return Ok(exercise);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExercise(Exercise exercise)
        {
            var updateExercise = await _context.Exercises.FirstOrDefaultAsync(e => e.Id == exercise.Id);
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
