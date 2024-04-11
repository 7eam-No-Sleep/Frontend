import { Component } from '@angular/core';
import { ShiftService } from '../shared/shift.service';
import { Shift } from '../view-shifts/shift.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-shift',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-shift.component.html',
  styleUrl: './edit-shift.component.css'
})
export class EditShiftComponent {
  shiftId: number = 0;
  shift: Shift = {
    shift_id: 0,
    employee_id: 0,
    shift_time: 0,
    shift_date: '',
    total_transactions: 0,
    total_cash: 0,
    total_card_sales: 0,
    total_checks: 0,
    total_sales: 0
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shiftService: ShiftService
  ){}  

  ngOnInit(): void{
    this.route.params.subscribe({
      next: params =>{
        this.shiftId = params['id'];
        this.shiftService.getShiftById(this.shiftId).subscribe({
          next: data =>{
            this.shift = data;
          },
          error: error=>{
            console.error('error fetching shift details:', error);
          }
        });
      },
      error: error =>{
        console.error('Error fetching route parameters:', error);
      }
    });
  }
  saveShift(): void{
    this.shiftService.updateShift(this.shift).subscribe({
      next: data =>{
        console.log('Shift Updated Successfully: ', data);
        this.router.navigate(['/viewshifts']);
      },
      error: error =>{
        console.error('Error updating shift:', error);
      }
    })
  }

}
