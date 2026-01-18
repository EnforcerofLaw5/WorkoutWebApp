import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '@app/entities';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private baseUrl = 'https://localhost:7114/api/exercise';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl);
  }

  get(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.baseUrl}/${id}`);
  }

  create(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.baseUrl}`, exercise);
  }

  update(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.baseUrl}/${exercise.id}`, exercise);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
