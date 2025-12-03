using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSCI338FinalProject.Server.Controllers
{
	public class WorkoutExerciseDetail
	{
		public int Id { get; set; }
		public int ExerciseId { get; set; }
		public string ExerciseName { get; set; }
		public double Sets { get; set; }
		public int Reps { get; set; }
		public string Category {  get; set; }
		public string PrimaryMuscle { get; set; }

	}

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

			var workoutExercises = _appStore.WorkoutExercises.Where( x =>  x.WorkoutId == workoutId);
			var results = new List<WorkoutExerciseDetail>();
			foreach (var workoutExercise in workoutExercises)
			{
				if(workoutExercise.Exercise != null)
				{
					results.Add(new WorkoutExerciseDetail()
					{
						Id = workoutExercise.Id,
						ExerciseId = workoutExercise.Exercise.Id,
						ExerciseName = workoutExercise.Exercise.Name,
						Sets = workoutExercise.Sets,
						Reps = workoutExercise.Reps,
						Category = workoutExercise.Exercise.Category,
						PrimaryMuscle = workoutExercise.Exercise.PrimaryMuscle

					});
				}
			}

            return Ok(results);
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
