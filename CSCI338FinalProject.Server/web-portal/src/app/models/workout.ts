import { Exercise } from "../entities";

export interface Workout {
  id: number;
  userId: number;
  name: string;
  type: string;
  notes: string;
  exercises: Exercise[];
}
