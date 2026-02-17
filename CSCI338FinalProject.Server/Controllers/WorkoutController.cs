using Microsoft.AspNetCore.Mvc;
using WOWA.BLL.Dtos;
using WOWA.BLL.Repositories;
using WOWA.BLL.Validation;


namespace CSCI338FinalProject.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WorkoutController(IWorkoutRepository _workoutRepository, IWorkoutValidator _workoutValidator) : ControllerBase
	{
		[HttpGet]
		public async Task<IActionResult> GetAllWorkouts()
		{
			var workouts = await _workoutRepository.GetAll();
			return Ok(workouts);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetWorkoutById(int id)
		{
			var workout = await _workoutRepository.Get(id);
			return Ok(workout);
		}

		[HttpPost]
		public async Task<IActionResult> Create(Workout workout)
		{
			workout.Clean();
			var newWorkout = await _workoutRepository.Create(workout);
			return Ok(newWorkout);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateWorkout(Workout workout)
		{
			workout.Clean();
			var updatedWorkout = await _workoutRepository.Update(workout);
			return Ok(updatedWorkout);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteWorkout(int id)
		{
			await _workoutRepository.Delete(id);
			return Ok();
		}

		[HttpPost("validate")]
		public async Task<IActionResult> Validate(Workout workout)
		{
			try
			{
				var validationResults = await _workoutValidator.Validate(workout);
				return Ok(validationResults);
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = ex.Message });
			}
		}
	}
}
