import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../entities';


@Injectable({ providedIn: 'root' })
export class ExerciseApiService {

    private readonly baseUrl = 'https://api.api-ninjas.com/v1/exercises';
  private readonly headers = new HttpHeaders({
    'X-Api-Key': '8RnxQIAUQmtmC3teRrd6ZQ==TOxl3qzAnUvsXGKT' 
  });

  constructor(private http: HttpClient) {}

  getExercises(): Observable<Exercise[]> {
    return this.http.get<any[]>(`${this.baseUrl}?muscle=all`, { headers: this.headers })
      .pipe(
        map(items =>
          items.map((item, index) => ({
            id: index + 1,
            name: item.name,
            category: item.type,
            primaryMuscle: item.muscle
          }))
        )
      );
  }

  searchExercises(query: string): Observable<Exercise[]> {
    return this.http.get<any[]>(`${this.baseUrl}?name=${query}`, { headers: this.headers })
      .pipe(
        map(items =>
          items.map((item, index) => ({
            id: index + 1,
            name: item.name,
            category: item.type,
            primaryMuscle: item.muscle
          }))
        )
      );
  }

}
