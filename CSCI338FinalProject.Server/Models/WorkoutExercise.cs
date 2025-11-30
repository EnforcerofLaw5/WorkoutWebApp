using System.ComponentModel.DataAnnotations;

namespace CSCI338FinalProject.Server.Models
{
    public class WorkoutExercise
    {
        [Required] public int Id { get; set; }
        public Workout Workout { get; set; }
        public int WorkoutId { get; set; }
        public Exercise Exercise { get; set; }
        public int ExerciseId { get; set; }
        [Range(0,10)] public double Rpe {  get; set; }
        public int Weight { get; set; }
        public int Reps { get; set; }
        public int RepsCompleted { get; set; }
        public double Sets { get; set; }
        public ICollection<ExerciseSet> SetsLogged = new List<ExerciseSet>();
    }
}
