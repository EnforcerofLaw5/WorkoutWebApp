using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Models
{
	public class Workout
	{
		[Required] public int Id { get; set; }
		public string Type { get; set; } = "Strength";
		public int UserID { get; set; }
		public string Notes { get; set; }
		public DateTime date { get; set; } = DateTime.Now;
		public string Name { get; set; }
		public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
		public User User { get; set; }

		public Dtos.Workout MaptoDto()
		{
			var workout = new Dtos.Workout
			{
				Id = Id,
				Type = Type,
				date = date,
				Name = Name,
				Notes = Notes,
				UserID = UserID,
				Exercises = new List<Dtos.Exercise>()
			};
			foreach (var exercise in Exercises)
				workout.Exercises.Add(exercise.MaptoDto());

			return workout;
		}
	}
}
