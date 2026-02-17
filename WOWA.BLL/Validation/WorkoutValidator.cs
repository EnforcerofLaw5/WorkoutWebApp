using WOWA.BLL.Dtos;
using WOWA.BLL.Repositories;

namespace WOWA.BLL.Validation;

public interface IWorkoutValidator
{
	Task<List<ValidationResult>> Validate(Workout workout);
}

public class WorkoutValidator(IWorkoutRepository _workoutRepository) : IWorkoutValidator
{
	private static DateTime MIN_DATE = new (2025, 1, 1);

	public async Task<List<ValidationResult>> Validate(Workout workout)
	{
		workout.Clean();
		List<ValidationResult> validationResults = new List<ValidationResult>();
		if (string.IsNullOrEmpty(workout.Name))
		{
			validationResults.Add(new ValidationResult("Name is required", Severity.Error));
		}
		if (string.IsNullOrEmpty(workout.Type))
		{
			validationResults.Add(new ValidationResult("Type is required", Severity.Error));
		}
		if (workout.date < MIN_DATE)
		{
			validationResults.Add(new ValidationResult($"Date must be greater than {MIN_DATE.ToShortDateString()}", Severity.Error));
		}
		if (!string.IsNullOrEmpty(workout.Name) && !string.IsNullOrEmpty(workout.Type))
		{
			var exists = false;
			var workouts = await _workoutRepository.GetByName(workout.Name);
			if (workout.IsNew())
			{
				exists = workouts.Any( x => x.Type == workout.Type);
			}
			else
			{
				exists = workouts.Any(x => x.Type == workout.Type && x.Id != workout.Id);
			}
			if(exists)
				validationResults.Add(new ValidationResult("Name and Type must be unique", Severity.Error));
		}

		return validationResults;
	}

	
}