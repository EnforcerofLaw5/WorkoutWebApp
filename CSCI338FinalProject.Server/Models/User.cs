

namespace CSCI338FinalProject.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double Age { get; set; }
        public double Weight { get; set; }
        public required string Goal { get; set; }
        public ICollection<Workout> Workouts { get; set; } = new List<Workout>();
    }
}
