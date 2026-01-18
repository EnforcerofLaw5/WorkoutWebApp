using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CSCI338FinalProject.Server.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string Type { get; set; } = "Strength";
        public int UserID { get; set; }
        public string Notes { get; set; }
        public DateTime date { get; set; } = DateTime.Now;
        public string Name { get; set; }
        public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
        [JsonIgnore]
        public User User { get; set; }
    }
}
