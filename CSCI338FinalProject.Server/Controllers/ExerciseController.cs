using Microsoft.AspNetCore.Mvc;
using WOWA.BLL.Dtos;
using WOWA.BLL.Repositories;
using WOWA.BLL.Validation;


namespace CSCI338FinalProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController(IExerciseRepository _exerciseRepository, IExerciseValidator _exerciseValidator) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllExercises()
        {
            var exercises = await _exerciseRepository.GetAll();
            return Ok(exercises);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExerciseById(int id)
        {
            var exercise = await _exerciseRepository.Get(id);
            return Ok(exercise);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Exercise exercise)
        {
            exercise.Clean();
            var newExercise = await _exerciseRepository.Create(exercise);
            return Ok(newExercise);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExercise(Exercise exercise)
        {
            exercise.Clean();
            var updatedExercise = await _exerciseRepository.Update(exercise);
            return Ok(updatedExercise);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(int id)
        {
            await _exerciseRepository.Delete(id);
            return Ok();
        }

        [HttpPost("validate")]
        public async Task<IActionResult> Validate(Exercise exercise)
        {
            try
            {
                var validationResults = await _exerciseValidator.Validate(exercise);
                return Ok(validationResults);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
