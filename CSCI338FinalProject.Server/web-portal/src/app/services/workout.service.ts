import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../entities';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private baseUrl = `https://localhost:7114/api/workout`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.baseUrl);
  }

  get(id: number): Observable<Workout> {
    return this.http.get<Workout>(`${this.baseUrl}/${id}`);
  }

  create(workout: Workout): Observable<Workout[]> {
    return this.http.post<Workout[]>(this.baseUrl, workout);
  }

  update(id: number, workout: Workout): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, workout);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
