import { Component } from '@angular/core';
import { ApLeftcolumnComponent } from './ap-leftcolumn/ap-leftcolumn.component';
import { ApRightcolumnComponent } from './ap-rightcolumn/ap-rightcolumn.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ApLeftcolumnComponent, ApRightcolumnComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

}
