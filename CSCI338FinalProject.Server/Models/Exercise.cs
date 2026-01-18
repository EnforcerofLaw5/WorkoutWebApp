using CSCI338FinalProject.Server.Data;
using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Models
{
    public class Exercise
    {
        [Required] public int Id { get; set; }
        public int WorkoutId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PrimaryMuscle { get; set; }
        public string Category { get; set; }
        public ICollection<ExerciseSet> ExerciseSets { get; set; }
        public Workout Workout { get; set; }

		public Dtos.Exercise MaptoDto()
		{
			var exercise = new Dtos.Exercise
			{ 
                Id = Id, 
                WorkoutId = 
                WorkoutId, 
                Name = Name, 
                PrimaryMuscle = PrimaryMuscle, 
                Category = Category 
            };
            return exercise;
		}
	}
}
