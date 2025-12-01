using CSCI338FinalProject.Server.Data;
using CSCI338FinalProject.Server.Models;
using Microsoft.AspNetCore.Mvc;


namespace CSCI338FinalProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly AppStore _appStore;
        public WorkoutController(AppStore appStore) => _appStore = appStore;

        [HttpGet]
        public IActionResult GetAllWorkouts() 
        {
            var workouts = _appStore.Workouts;
            return Ok(workouts);
        }

        [HttpGet("suggest/{userId}")]
        public async Task<ActionResult<Workout>> GetSuggestion(int userId, [FromServices] Suggestion svc)
        {
            var suggestion = await svc.SuggestWorkout(userId);
            return Ok(suggestion);
        }

        [HttpGet("{id}")]
        public IActionResult GetWorkoutById(int id)
        {
            var workout= this._appStore.Workouts.Where( x => x.Id == id).FirstOrDefault();
                        return Ok(workout);
        }
         
        [HttpPost]
        public IActionResult Create(Workout workout)
        {
            var created = this._appStore.AddWorkOut(workout);
			            return Ok(created);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWorkout(int id, Workout workout)
        {
            var updateWorkout = _appStore.Workouts.FirstOrDefault( x => x.Id == id);
            if (updateWorkout == null)
            {
                return NotFound();
            }
            updateWorkout.Type = workout.Type;
            updateWorkout.Notes = workout.Notes;
            updateWorkout.date = workout.date;
            return Ok(updateWorkout);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWorkout(int id)
        {
            var workout = _appStore.Workouts.FirstOrDefault(x => x.Id == id);
            if(workout != null)
                this._appStore.Workouts.Remove(workout);
            return Ok();
        }
    }
}
