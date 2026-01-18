using System.Text.Json.Serialization;

namespace CSCI338FinalProject.Server.Models
{
    public class ExerciseSet
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public int RepsCompleted { get; set; }
        public double Rpe { get; set; }
        public double WeightUsed { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        [JsonIgnore]
        public Exercise Exercise { get; set; }
    }
}
