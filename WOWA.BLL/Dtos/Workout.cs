using Microsoft.EntityFrameworkCore;
using WOWA.BLL.DAL;

namespace WOWA.BLL.Dtos
{
    public class Workout : DtoBase
	{
		public string Type { get; set; } = "Strength";
		public int UserID { get; set; } = -1;
        public string Notes { get; set; } = string.Empty;
		public DateTime date { get; set; } = DateTime.Now;
        public string Name { get; set; } = string.Empty;
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

		public void Clean()
		{
			Type = Type.Trim();
			Name = Name.Trim();
			Notes = Notes.Trim();
		}
	}
}
