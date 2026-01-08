export interface Exercise {
    id: number;
    workoutId: number;
    name: string;
    primaryMuscle: string;
    category: string;
    exerciseSets: ExerciseSet[];
    workout?: Workout;
}

export interface ExerciseSet {
    id: number;
    exerciseId: number;
    repsCompleted: number;
    rpe: number;
    weightUsed: number;
    timeStamp: Date;
    exercise?: Exercise;
}

export interface User {
    id: number;
    name: string;
    age: number;
    weight: number;
    goal: string;
    workouts?: Workout[];

}

export interface Workout {
    id: number;
    type: string;
    user?: User;
    userID: number;
    notes: string;
    date: Date;
    name: string;
    exercises: Exercise[];
}