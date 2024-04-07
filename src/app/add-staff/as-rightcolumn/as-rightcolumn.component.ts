import { Component,EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../view-staff/employee.model';

@Component({
  selector: 'app-as-rightcolumn',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './as-rightcolumn.component.html',
  styleUrl: './as-rightcolumn.component.css'
})
export class AsRightcolumnComponent {
  @Output() formDataChanged = new EventEmitter<Partial<Employee>>();

  address: string='';
  phone_number: string ='';
  employee_passcode: string = '';

  constructor(){}

  emitFormData(){
    const formData: Partial<Employee>={
      address: this.address,
      phone_number: this.phone_number,
      employee_passcode: this.employee_passcode
    }
    this.formDataChanged.emit (formData)
  }

}
