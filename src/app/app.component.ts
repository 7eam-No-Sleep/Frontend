import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule, NgFor } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { HeaderManagerComponent } from './header-manager/header-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,  RouterOutlet, NgFor, LoginComponent, HeaderManagerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = "Honey-Be's Boutique";
  constructor(private authService: AuthService) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Implement this method in your AuthService
  }

  isManager(): boolean {
    return this.authService.getUserRole() === 'manager'; // Implement this method in your AuthService
  }

  isEmployee(): boolean {
    return this.authService.getUserRole() === 'employee'; // Implement this method in your AuthService
  }

}
