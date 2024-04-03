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
  login(employeeId: number, password: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/employee/${employeeId}/credentials?password=${password}`
    ).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Store token in local storage
          localStorage.setItem('role', response.role); // Store role in local storage
        }
      })
    );
  }

  getUserRole(): string {
    const role = localStorage.getItem('role');
    if (role && (role === 'employee' || role === 'manager')) {
      return role;
    }
    return 'unknown';
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}


