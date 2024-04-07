import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from './employee.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.css'
})
export class ViewStaffComponent {

  employees: Employee[] = [];
  filteredEmployee: Employee[]=[];
  searchQuery: string = '';

  constructor(private EmployeeService: EmployeeService){}

  ngOnInit(): void{
    this.EmployeeService.getEmployees().subscribe({
      next: (data)=>{
        this.employees = data;
        this.filteredEmployee = [...this.employees];
      },
      error: (error)=>{
        console.error('Error Fetching Employees: ', error);
      }
    });
  }

  searchEmployee(){
    if(!this.searchQuery || this.searchQuery==''){
      this.filteredEmployee = [...this.employees];
    }else{
      const query = parseInt(this.searchQuery);
      this.filteredEmployee = this.employees.filter((employee)=>
      employee.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      
      employee.employee_id === query
      );
    }
  }

}
