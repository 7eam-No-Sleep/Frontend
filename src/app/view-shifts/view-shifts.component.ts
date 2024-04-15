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

  searchShifts() {
    // Check if the searchQuery is empty or not present
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      // Assign all shifts to filteredShifts if there's no query
      this.filteredShifts = [...this.shifts];
    } else {
      // Attempt to parse the searchQuery as an integer
      const numericQuery = parseInt(this.searchQuery, 10);
      // Check if the numeric conversion was successful
      const isNumeric = !isNaN(numericQuery);
  
      // Filter shifts based on employee_id or shift_date
      this.filteredShifts = this.shifts.filter((shift) => {
        // Compare as numbers if numericQuery is valid, otherwise return false
        const matchesId = isNumeric && shift.employee_id === numericQuery;
        // Compare as strings for dates
        const matchesDate = shift.shift_date === this.searchQuery.trim();
  
        // Return true if any condition matches
        return matchesId || matchesDate;
      });
    }
  }
}
