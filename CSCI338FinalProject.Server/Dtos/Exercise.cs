using CSCI338FinalProject.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Dtos
{
    public class Exercise
    {
		[Required] public int Id { get; set; }
        public int WorkoutId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PrimaryMuscle { get; set; }
        public string Category { get; set; }
        public ICollection<ExerciseSet> ExerciseSets { get; set; }

		public async Task<Models.Exercise> MapToModel(AppDbContext dbContext)
        {
            var exercise = await dbContext.Exercises.FirstOrDefaultAsync(x => x.Id == Id);
            if (exercise == null) 
                exercise = new Models.Exercise();

            exercise.Name = Name;
            exercise.PrimaryMuscle = PrimaryMuscle;
            exercise.Category = Category;
            return exercise;
        }
	}
}
