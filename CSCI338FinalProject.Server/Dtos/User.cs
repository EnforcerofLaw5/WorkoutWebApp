

using CSCI338FinalProject.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Dtos
{
    public class User
    {
		[Required] public int Id { get; set; }
		public required string Name { get; set; }
        public double Age { get; set; }
        public double Weight { get; set; }
        public required string Goal { get; set; }
        public ICollection<Workout> Workouts { get; set; } = new List<Workout>();

        public async Task<Models.User> MapToModel(AppDbContext dbContext)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync( u => u.Id == Id);
            if (user == null) 
                user = new Models.User();

            user.Weight = Weight;
            user.Name = Name;
            user.Age = Age;
            user.Goal = Goal;

            return user;
        }
    }
}
