import { Component } from '@angular/core';
import { ShiftService } from '../shared/shift.service';
import { Shift } from './shift.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-shifts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-shifts.component.html',
  styleUrl: './view-shifts.component.css'
})
export class ViewShiftsComponent {
  shifts: Shift[] = [];

  
  constructor(private shiftService: ShiftService, private router: Router){}

  ngOnInit(): void{
    this.getShifts();
  }

  getShifts(): void{
    this.shiftService.getShifts()
    .subscribe(shifts => this.shifts = shifts);
  }

  onEdit(shiftId: number){
    this.router.navigate(['/shift', shiftId, 'edit'])
  }



}
