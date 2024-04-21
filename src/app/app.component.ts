import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule, NgFor } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { HeaderManagerComponent } from './header-manager/header-manager.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { TextboxComponent } from './reports/textbox/textbox.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,  RouterOutlet, NgFor, LoginComponent, HeaderManagerComponent, CommonModule, ReactiveFormsModule, TextboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = "Honey-Be's Boutique";

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return true;//this.authService.isLoggedIn();
  }

  isManager(): boolean {
    return this.authService.getUserRole() === 'manager';
  }
  isEmployee(): boolean{
    return this.authService.getUserRole()==='sales';
  }
}
