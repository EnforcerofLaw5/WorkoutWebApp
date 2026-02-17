using System.ComponentModel.DataAnnotations;

namespace WOWA.BLL.Models
{
    public class ExerciseSet
    {
		[Required] public int Id { get; set; }
		public int ExerciseId { get; set; }
        public int RepsCompleted { get; set; }
        public double Rpe { get; set; }
        public double WeightUsed { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        public Exercise Exercise { get; set; }
    }
}
