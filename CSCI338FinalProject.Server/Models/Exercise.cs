using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public Workout Workout { get; set; }
    }
}
