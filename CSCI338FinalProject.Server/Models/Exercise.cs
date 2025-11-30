using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Models
{
    public class Exercise
    {
        [Required] public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public required string PrimaryMuscle { get; set; }
        public required string Category { get; set; }

    }
}
