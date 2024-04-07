import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from '../../view-staff/employee.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-as-leftcolumn',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './as-leftcolumn.component.html',
  styleUrl: './as-leftcolumn.component.css'
})
export class AsLeftcolumnComponent {
  @Output() formDataChanged = new EventEmitter<Partial<Employee>>();

  employee_id: number = 0;
  role: string = '';
  first_name: string = '';
  last_name: string = '';

  constructor(){}

  emitFormData(){
    const formData: Partial<Employee>={
      employee_id: this.employee_id,
      role: this.role,
      first_name: this.first_name,
      last_name: this.last_name
    }
    this.formDataChanged.emit(formData)
  }

}
