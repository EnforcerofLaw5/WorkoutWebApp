import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkoutExerciseDetail } from '../models/workout-exercise';

export interface WorkoutExercise {
  id: number;
  workoutId: number;
  exerciseId: number;
  sets: number;
  reps: number;
  weight: number;
}

@Injectable({ providedIn: 'root' })
export class WorkoutExerciseService {
  private baseUrl = 'https://localhost:7114/api/workoutexercise';

  constructor(private http: HttpClient) { }

  getAll(): Observable<WorkoutExercise[]> {
    return this.http.get<WorkoutExercise[]>(this.baseUrl);
  }

  get(id: number): Observable<WorkoutExercise[]> {
    return this.http.get<WorkoutExercise[]>(`${this.baseUrl}/${id}`);
  }

  create(we: WorkoutExercise): Observable<WorkoutExercise[]> {
    return this.http.post<WorkoutExercise[]>(this.baseUrl, we);
  }

  update(id: number, we: WorkoutExercise): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, we);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getForWorkout(workoutId: number): Observable<WorkoutExerciseDetail[]> {
    return this.http.get<WorkoutExerciseDetail[]>(`${this.baseUrl}/workout/${workoutId}`)
  }

  addToWorkout(workoutId: number, data: any) {
    return this.http.post(`${this.baseUrl}/workout/${workoutId}`, data);
  }
}
