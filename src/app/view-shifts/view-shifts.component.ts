import { Component } from '@angular/core';
import { ShiftService } from '../shared/shift.service';
import { Shift } from './shift.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-shifts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-shifts.component.html',
  styleUrl: './view-shifts.component.css'
})
export class ViewShiftsComponent {
  shifts: Shift[] = [];
  searchQuery: string='';
  filteredShifts: Shift[] = [];

  
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

  searchShifts(){
    if(!this.searchQuery || this.searchQuery==''){
      this.filteredShifts = [...this.shifts];
  } else{
    const query = parseInt(this.searchQuery);
    this.filteredShifts = this.shifts.filter((shift) =>
      shift.employee_id === query ||
      shift.shift_date === this.searchQuery

  );
  }
}
}
