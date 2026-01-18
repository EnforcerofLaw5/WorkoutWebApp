using CSCI338FinalProject.Server.Data;
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
			var exercises = new List<Dtos.Exercise>();
			var dtoExercises = await _context.Exercises.ToListAsync();
            foreach (var dto in dtoExercises)
                exercises.Add(dto.MaptoDto());
            return Ok(exercises);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExerciseById(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            return Ok(exercise.MaptoDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Dtos.Exercise exercise)
        {
            var dbExercise = await exercise.MapToModel(_context);
            _context.Exercises.Add(dbExercise);
            _context.SaveChanges();
            return Ok(dbExercise.MaptoDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExercise(Dtos.Exercise exercise)
        {
            var dbExercise = await exercise.MapToModel(_context);
            await _context.SaveChangesAsync();
            return Ok(dbExercise.MaptoDto());
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
