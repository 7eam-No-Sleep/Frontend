import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ShiftService } from '../shared/shift.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private authService: AuthService, private router: Router, private shiftService: ShiftService){}

  logout(): void {
    this.shiftService.endShift();


  }
}
