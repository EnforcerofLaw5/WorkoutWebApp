import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = 'https://localhost:7135/api/workoutexercise';

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
}
