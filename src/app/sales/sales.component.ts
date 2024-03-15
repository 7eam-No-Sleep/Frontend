import { Component } from '@angular/core';
import { LeftColumnComponent } from './left-column/left-column.component';
import { RightColumnComponent } from './right-column/right-column.component';
import { MidColumnComponent } from './mid-column/mid-column.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [LeftColumnComponent, RightColumnComponent, MidColumnComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})

export class SalesComponent {

}
