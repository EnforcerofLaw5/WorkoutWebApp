import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout, Exercise } from '../entities';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private baseUrl = `https://localhost:7114/api/workout`;

  constructor(private http: HttpClient) { }

  getAll = () => {
    return this.http.get<Workout[]>(this.baseUrl);
  }

  get = (id: number) => {
    return this.http.get<Workout>(`${this.baseUrl}/${id}`);
  }

  create = (userId: number) => {
    return this.http.post<Workout[]>(`${this.baseUrl}/users/${userId}`, userId);
  }

  update = (id: number, userId: number, workout: Workout) => {
    return this.http.put<Workout>(`${this.baseUrl}/users/${userId}/workout/${id}`, workout);
  }

  addToWorkout = (workoutId: number, exercise: Exercise) => {
    return this.http.post<Exercise>(`${this.baseUrl}/${workoutId}`, exercise);
  }

  delete = (id: number) => {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
