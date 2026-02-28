using WOWA.BLL.Dtos;
using WOWA.BLL.Repositories;

namespace WOWA.BLL.Validation;

public interface IExerciseValidator
{
    Task<List<ValidationResult>> Validate(Exercise exercise);
}

public class ExerciseValidator(IExerciseRepository _exerciseRepository) : IExerciseValidator
{
    private static DateTime MIN_DATE = new(2025, 1, 1);

    public async Task<List<ValidationResult>> Validate(Exercise exercise)
    {
        exercise.Clean();
        List<ValidationResult> validationResults = new List<ValidationResult>();
        if (string.IsNullOrEmpty(exercise.Name))
        {
            validationResults.Add(new ValidationResult("Name is required", Severity.Error));
        }
        if (string.IsNullOrEmpty(exercise.PrimaryMuscle))
        {
            validationResults.Add(new ValidationResult("Primary Muscle is required", Severity.Warning));
        }
        if (string.IsNullOrEmpty(exercise.Category))
        {
            validationResults.Add(new ValidationResult("Category is required", Severity.Warning));
        }
        if (!string.IsNullOrEmpty(exercise.Name))
        {
            var exists = false;
            var exercises = await _exerciseRepository.GetByName(exercise.Name);
            if (exercise.IsNew())
            {
                exists = exercises.Any(x => x.Name == exercise.Name);
            }
            else
            {
                exists = exercises.Any(x => x.Name == exercise.Name && exercise.Id != exercise.Id);
            }
            if (exists)
                validationResults.Add(new ValidationResult("Name must be unique", Severity.Error));
        }

        return validationResults;
    }


}