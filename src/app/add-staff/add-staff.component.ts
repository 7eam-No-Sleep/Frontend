import { Component } from '@angular/core';
import { AsLeftcolumnComponent } from './as-leftcolumn/as-leftcolumn.component';
import { AsRightcolumnComponent } from './as-rightcolumn/as-rightcolumn.component';
import { Employee } from '../view-staff/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [AsLeftcolumnComponent, AsRightcolumnComponent, CommonModule],
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffComponent {
  staff: Employee = {
    employee_id: 0,
    role: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    employee_passcode: '',
    last_login: '',
    last_logout: '',
    total_hours_worked: 0
  }

  constructor( private employeeService: EmployeeService){}

  updateFormData(data: Partial<Employee>){
    this.staff = {...this.staff, ...data};
  }

  submitForm(){
    this.employeeService.addEmployee(this.staff)
    .subscribe({
      next: () =>{
        location.reload();
      },
      error: (error)=>{
        console.error('Error Adding Employee:', error);
      }
    })
  }
}
