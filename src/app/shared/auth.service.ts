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

  logout(): void {
    // Get user ID from local storage
    const userId = localStorage.getItem('userID');
  
    // Check if userId is not null before making the API call
    if (userId !== null) {
      // Make API call to update last logout time
      this.updateLastLogoutTime(userId).subscribe(
        () => {
          console.log('Logout request successful');
          // Remove tokens from local storage
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('userID');
          console.log('Local storage items removed');
        },
        (error) => {
          console.error('Error updating last logout time:', error);
          // Optionally handle error, such as showing an error message
        }
      );
    } else {
      console.error('User ID not found in local storage');
      // Optionally handle this case, such as showing an error message
    }
  }
  
  // Define the method to update last logout time
  private updateLastLogoutTime(userId: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/employee/${userId}/logout`,
      null
    );
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}