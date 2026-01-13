import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise, ExerciseSet } from '@app/entities';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private baseUrl = 'https://localhost:7114/api/exercise';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl);
  }

  get(id: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/${id}`);
  }

  create(workoutId: number): Observable<Exercise[]> {
    return this.http.post<Exercise[]>(`${this.baseUrl}/workouts/${workoutId}`, workoutId);
  }

  update(id: number, workoutId: number, exercise: Exercise): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/workout/${workoutId}/exercises/${id}`, exercise);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addToExercise(exerciseId: number, exerciseSet: ExerciseSet) {
    return this.http.post(`${this.baseUrl}/${exerciseId}`, exerciseSet);
  }
}
