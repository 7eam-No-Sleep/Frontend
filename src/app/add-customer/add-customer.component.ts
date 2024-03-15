import { Component } from '@angular/core';
import { AcLeftcolumnComponent } from './ac-leftcolumn/ac-leftcolumn.component'; 
import { AcRightcolumnComponent } from './ac-rightcolumn/ac-rightcolumn.component';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [AcLeftcolumnComponent, AcRightcolumnComponent],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

}
