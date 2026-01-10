import { ExerciseSet } from "../entities";

export interface Exercise {
  id: number;
  workoutId: number;
  name: string;
  category: string;
  primaryMuscle: string;
  exerciseSets: ExerciseSet[];
}
