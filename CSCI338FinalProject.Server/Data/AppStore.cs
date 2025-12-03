using CSCI338FinalProject.Server.Models;

namespace CSCI338FinalProject.Server.Data
{
	public class AppStore
	{
        public AppStore()
        {
            Workouts = new List<Workout>();
            Exercises = new List<Exercise>();
            WorkoutExercises = new List<WorkoutExercise>();
            Users = new List<User>();
            ExerciseSets = new List<ExerciseSet>();

            SeedData();
        }

        private void SeedData()
        {
            Exercises.Add(new Exercise
            {
                Id = 1,
                Name = "Bench Press",
                Category = "Strength",
                PrimaryMuscle = "Chest"
            });

            Exercises.Add(new Exercise
            {
                Id = 2,
                Name = "Pull Ups",
                Category = "Strength",
                PrimaryMuscle = "Back"
            });

            Exercises.Add(new Exercise
            {
                Id = 3,
                Name = "Squats",
                Category = "Strength",
                PrimaryMuscle = "Legs"
            });

            Exercises.Add(new Exercise
            {
                Id = 4,
                Name = "Deadlift",
                Category = "Strength",
                PrimaryMuscle = "Back / Legs"
            });

            Exercises.Add(new Exercise
            {
                Id = 5,
                Name = "Running",
                Category = "Cardio",
                PrimaryMuscle = "Full Body"
            });

            Workouts.Add(new Workout
            {
                Id = 1,
                Name = "Monday: Push Day",
            });

            Workouts.Add(new Workout
            {
                Id = 2,
                Name = "Tuesday: Pull Day",
            });

            Workouts.Add(new Workout
            {
                Id = 3,
                Name = "Wednesday: Legs",
            });


            WorkoutExercises.Add(new WorkoutExercise
            {
                Id = 1,
                WorkoutId = 1,
                ExerciseId = 1,  // Bench Press
                Sets = 4,
                Reps = 8,
                Exercise = Exercises.FirstOrDefault( x => x.Name == "Bench Press")
            });

            WorkoutExercises.Add(new WorkoutExercise
            {
                Id = 2,
                WorkoutId = 2,
                ExerciseId = 2,  // Pull Ups
                Sets = 3,
                Reps = 10,
				Exercise = Exercises.FirstOrDefault(x => x.Name == "Pull Ups")
			});

            WorkoutExercises.Add(new WorkoutExercise
            {
                Id = 3,
                WorkoutId = 3,
                ExerciseId = 3, // Squats
                Sets = 5,
                Reps = 5,
				Exercise = Exercises.FirstOrDefault(x => x.Name == "Squats")
			});

            WorkoutExercises.Add(new WorkoutExercise
            {
                Id = 4,
                WorkoutId = 3,
                ExerciseId = 4, // Deadlift
                Sets = 3,
                Reps = 3,
				Exercise = Exercises.FirstOrDefault(x => x.Name == "Deadlift")
			});

            for (int i = 0; i  < Workouts.Count; i++)
            {
                Workouts[i].WorkoutExercises = WorkoutExercises
                    .Where(x => x.WorkoutId == (i + 1)).ToList();
            }

        }

        public Workout AddWorkOut(Workout workout)
        {
            workout.Id = Workouts.Count == 0 ? 1 : Workouts.Max(w => w.Id) + 1;
            Workouts.Add(workout);
            return workout;
        }

        public Exercise AddExercise(Exercise exercise)
        {
            exercise.Id = Exercises.Count == 0 ? 1 : Exercises.Max(e => e.Id) + 1;
            Exercises.Add(exercise);
            return exercise;
        }

        public WorkoutExercise AddWorkoutExercise(WorkoutExercise we)
        {
            we.Id = WorkoutExercises.Count == 0 ? 1 : WorkoutExercises.Max(x => x.Id) + 1;
            if (we.Exercise != null && we.Exercise.Id < 1)
            {
                we.Exercise = AddExercise(we.Exercise);
                we.ExerciseId = we.Exercise.Id;
            }
            WorkoutExercises.Add(we);
            return we;
        }

        public List<Workout> Workouts { get; set; }
        public List<Exercise> Exercises { get; set; }
        public List<User> Users { get; set; }
        public List<ExerciseSet> ExerciseSets { get; set; }
        public List<WorkoutExercise> WorkoutExercises { get; set; }
    }
}
