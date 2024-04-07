import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-manager',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-manager.component.html',
  styleUrl: './header-manager.component.css'
})
export class HeaderManagerComponent {
  constructor(private authService: AuthService, private router: Router){}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

