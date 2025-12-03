import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SuggestionService {
  private baseUrl = 'https://localhost:7114/api/workout/suggest';

  constructor(private http: HttpClient) { }

  getSuggestion(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }
}
