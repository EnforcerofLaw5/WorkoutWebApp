using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Models
{
	public class User
	{
		[Required] public int Id { get; set; }
		public string Name { get; set; }
		public double Age { get; set; }
		public double Weight { get; set; }
		public string Goal { get; set; }
		public ICollection<Workout> Workouts { get; set; } = new List<Workout>();

		public Dtos.User MaptoDto()
		{
			return new Dtos.User { Id = Id, Name = Name, Goal = Goal, Weight = Weight, Age = Age };

		}
	}
}
