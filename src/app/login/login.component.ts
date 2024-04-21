import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShiftService } from '../shared/shift.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  employeeId: number=0;
  password: string = '0';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private shiftService: ShiftService){}

  onSubmit(): void {
    if (!this.employeeId || !this.password) {
      this.errorMessage = "Employee ID and password are required.";
      return;
    }

    this.authService.login(this.employeeId, this.password)
      .subscribe({
        next: () => {
          this.errorMessage = ''; // Clear any existing error message.
          const userRole = this.authService.getUserRole();
          this.shiftService.startShift();
          if (userRole === 'sales') {
            this.router.navigate(['/sales']);
          } else if (userRole === 'manager') {
            this.router.navigate(['/viewinventory']);
          } else {
            console.error('Unknown user role:', userRole);
          }
        },
        error: (error) => {
          // Set error message based on the response from the server
          const errorMessage = error.error.message || 'Incorrect Password';
          if (errorMessage.toLowerCase().includes('password')) {
            this.errorMessage = 'Error: Incorrect password';
          } else if (errorMessage.toLowerCase().includes('not found')) {
            this.errorMessage = 'Error: User not found';
          } else {
            this.errorMessage = 'Login Failed: ' + errorMessage;
          }
        }
      });
  }
}