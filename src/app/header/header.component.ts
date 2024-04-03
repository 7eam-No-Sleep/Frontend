import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private authService: AuthService, private router: Router){}

  logout(): void {
    this.authService.logout();
    // Redirect to the login page or any other desired route
    this.router.navigate(['/login']);
  }
}
