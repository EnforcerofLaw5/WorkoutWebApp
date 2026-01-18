using CSCI338FinalProject.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Dtos
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

		public async Task<Models.Workout> MapToModel(AppDbContext dbContext)
		{
			var workout = await dbContext.Workouts.FirstOrDefaultAsync(x => x.Id == Id);
			if( workout == null) 
				workout = new Models.Workout();

			workout.Name = Name;
			workout.Type = Type;
			workout.date = date;
			workout.Notes = Notes;
			return workout;
		}
	}
}
