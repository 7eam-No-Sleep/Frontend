import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  employeeId: number=0;
  password: string = '';

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(): void {
    this.authService.login(this.employeeId, this.password)
      .subscribe({
        next: () => {
          const userRole = this.authService.getUserRole();
          if (userRole === 'sales') {
            this.router.navigate(['/sales']);
          } else if (userRole === 'manager') {
            this.router.navigate(['/viewinventory']);
          } else {
            console.error('Unknown user role:', userRole);
          }
        },
        error: (error) => {
          console.error('Login Failed: ', error);
        }
      });
    }
}
