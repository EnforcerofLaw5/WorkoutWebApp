export interface Exercise {
    id: number;
    name: string;
    primaryMuscle: string;
    category: string;

}

export interface ExerciseSet {
    id: number;
    workoutExerciseId: number;
    repsCompleted: number;
    rpe: number;
    weightUsed: number;
    timeStamp: Date;
}

export interface User {
    id: number;
    name: string;
    age: number;
    weight: number;
    goal: string;
    workouts: Workout[];

}

export interface Workout {
    id: number;
    type: string;
    user: User;
    userID: number;
    notes: string;
    date: Date;
    name: string;
    workoutExercises: WorkoutExercise[];

}

export interface WorkoutExercise {
    id: number;
    workoutId: number;
    exercise: Exercise;
    exerciseId: number;
    rpe: number;
    weight: number;
    reps: number;
    repsCompleted: number;
    sets: number;

}