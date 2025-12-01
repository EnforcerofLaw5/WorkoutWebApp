using CSCI338FinalProject.Server.Models;

namespace CSCI338FinalProject.Server.Data
{
	public class AppStore
	{
		public AppStore() 
		{
			Workouts = new List<Workout>();
			Workouts.Add(new Workout()
			{
				Id = 1,
				Name = "Test",
			});
			Workouts.Add(new Workout()
			{
				Id = 2,
				Name = "Test 2",
			});

			Exercises = new List<Exercise>();
			Exercises.Add( new Exercise()
			{
				Id = 1,
				Name = "Test Ex1",
				Category = "Test Ex1",
				PrimaryMuscle = "Test Ex1"
			}
			);
			Exercises.Add(new Exercise()
			{
				Id = 2,
				Name = "Test Ex2",
				Category = "Test Ex2",
				PrimaryMuscle = "Test Ex2"
			}
			);
		}

		public Workout AddWorkOut(Workout workout)
		{
			workout.Id = 1;
			if (this.Workouts.Count > 0)
			{
				workout.Id = this.Workouts.Max(x => x.Id) + 1;
			}
			Workouts.Add(workout);
			return workout;
		}

		public Exercise AddExercise(Exercise exercise)
		{
			exercise.Id = 1;
			if (this.Exercises.Count > 0)
			{
				exercise.Id = this.Exercises.Max(x => x.Id) + 1;
			}
			Exercises.Add(exercise);
			return exercise;
		}

		public WorkoutExercise AddWorkoutExercise(WorkoutExercise exercise)
		{
			exercise.Id = 1;
			if (this.WorkoutExercises.Count > 0)
			{
				exercise.Id = this.WorkoutExercises.Max(x => x.Id) + 1;
			}
			WorkoutExercises.Add(exercise);
			return exercise;
		}

		public List<Workout> Workouts { get; set; }
		public List<Exercise> Exercises { get; set; }
		public List<User> Users { get; set; }
		public List<ExerciseSet> ExerciseSets {get; set;}
		public List<WorkoutExercise> WorkoutExercises {get;set; }
	}
}
