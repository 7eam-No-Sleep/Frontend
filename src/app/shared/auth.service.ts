import { Injectable } from '@angular/core';
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

    login(employeeId: number, password: string) {
    return this.http.get<any>(
      `${this.apiUrl}/employee/${employeeId}/credentials?password=${password}`
    ).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('userID', response.userID);
        }
      })
    );
  }

  getUserRole(): string {
    return localStorage.getItem('role') || 'unknown';
  }

  logout() {
    const userId = localStorage.getItem('userID');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userID');

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}