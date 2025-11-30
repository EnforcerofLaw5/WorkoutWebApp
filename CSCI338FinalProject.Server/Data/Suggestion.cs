using CSCI338FinalProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CSCI338FinalProject.Server.Data
{
    public class Suggestion
    {
        private readonly AppDbContext _context;

        public Suggestion(AppDbContext context)
        {
            _context = context;
        }

        public string SuggestCategory(int userId)
        {
            var oneWeekAgo = DateTime.UtcNow.AddDays(-7);

            var categoryVolumes = _context.WorkoutExercises
                .Where(we => we.Workout.Id == userId &&
                             we.Workout.date >= oneWeekAgo)
                .GroupBy(we => we.Exercise.Category)
                .Select(g => new
                {
                    Category = g.Key,
                    Volume = g.Sum(x =>
                        (x.Weight * x.Reps * x.Sets))
                })
                .ToList();

            if (!categoryVolumes.Any())
                return "Full Body";

            return categoryVolumes.OrderBy(x => x.Volume)
                                  .First().Category;
        }

        public int SuggestNextWeight(int exerciseId, int userId)
        {
            var last3 = _context.WorkoutExercises
                .Where(we => we.ExerciseId == exerciseId &&
                             we.Workout.Id == userId)
                .OrderByDescending(we => we.Workout.date)
                .Take(3)
                .ToList();

            if (last3.Count == 0)
                return 10;

            var last = last3.First();
            double avgCompletion = last3.Average(x =>
            {
                if (x.RepsCompleted == 0)
                    return 1.0;
                return (double)x.RepsCompleted / x.Reps;
            });

            if (avgCompletion > 1.0)
                return (int)(last.Weight * 1.05);

            if (avgCompletion >= 0.9)
                return (int)(last.Weight * 1.02);

            return last.Weight;
        }
        public List<Exercise> SuggestExercisesByCategory(string category, int userId)
        {
            var all = _context.Exercises
                .Where(e => e.Category == category)
                .ToList();
            var cutoff = DateTime.UtcNow.AddDays(-3);

            var recentExerciseIds = _context.WorkoutExercises
                .Where(we => we.Workout.Id == userId &&
                             we.Workout.date >= cutoff)
                .Select(we => we.ExerciseId)
                .Distinct()
                .ToList();

            return all
                .Where(e => !recentExerciseIds.Contains(e.Id))
                .Take(5)
                .ToList();
        }
        public async Task<Workout> SuggestWorkout(int userId)
        {
            var category = SuggestCategory(userId);
            var exercises = SuggestExercisesByCategory(category, userId);
            var workout = new Workout
            {
                UserID = userId,
                date = DateTime.UtcNow,
                Name = $"Suggested {category} Workout",
                WorkoutExercises = new List<WorkoutExercise>()
            };

            foreach (var ex in exercises)
            {
                workout.WorkoutExercises.Add(new WorkoutExercise
                {
                    ExerciseId = ex.Id,
                    Sets = 3,
                    Reps = 8,
                    Weight = SuggestNextWeight(ex.Id, userId)
                });
            }
            return workout;
        }
    }
}
