using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSCI338FinalProject.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WorkoutExerciseController : ControllerBase
	{
		private readonly AppStore _appStore;
		public WorkoutExerciseController(AppStore context) => _appStore = context;

		[HttpGet("workout/{workoutId}")]
		public IActionResult GetExercisesForWorkout(int workoutId)
		{
			var workout = _appStore.Workouts.FirstOrDefault(x => x.Id == workoutId);
			if (workout == null)
				return NotFound();
			else
				return Ok(workout.WorkoutExercises);
		}

		[HttpGet("{id}")]
		public IActionResult GetWorkoutExercise(int id)
		{
			var item = _appStore.WorkoutExercises.FirstOrDefault(x => x.Id == id);
			if (item == null)
				return NotFound();

			return Ok(item);
		}

		[HttpPost]
		public ActionResult<WorkoutExercise> CreateWorkoutExercise(WorkoutExercise workoutExercise)
		{
			var added = _appStore.AddWorkoutExercise(workoutExercise);
			
			return Ok(added);
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteWorkoutExerciseId(int id)
		{
			var workout = _appStore.WorkoutExercises.FirstOrDefault(x => x.Id == id);
			if (workout != null)
				this._appStore.WorkoutExercises.Remove(workout);
			return Ok();
		}
	}
}
