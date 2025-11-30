import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Workout {
  id: number;
  userId: number;
  date: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private baseUrl = 'http://localhost:5111/api/workout';

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

  list(): Observable<Workout[]> {
  return this.http.get<Workout[]>(`${this.baseUrl}`);
}
}
