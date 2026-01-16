import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `https://localhost:7114/api/user`;

  constructor(private http: HttpClient) { }

  get = (id: number) => {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
