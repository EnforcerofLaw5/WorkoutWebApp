using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string Type { get; set; } = "Strength";
        public User User { get; set; }
        public int UserID { get; set; }
        public string Notes { get; set; }
        public DateTime date { get; set; } = DateTime.Now;
        public string Name { get; set; }
        public ICollection<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}
