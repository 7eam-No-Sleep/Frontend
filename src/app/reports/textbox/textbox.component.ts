import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';

/**
 *                    -- Important!!--
 *    Current Plan:
 *      Add to a dropdown box above the textbox
 *      The dropdown options will be the the descriptors of the desired reports category
 *      (i.e: Inventory, Transactions, Sales, etc.)
 *      The selection of the drop down box will be used to export the appropriate report to a csv
 *      The textbox will query the exported csv 
 */
@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.css'
})
 
export class TextboxComponent {
 // @Input() formDataChanged = new EventEmitter<Partial<us>>();


  userQuery: string = '';
  sampleQuestion: string='';

  constructor(private formBuilder: FormBuilder) { }

  updateQueryData(data: string){
    this.userQuery = data;
    this.sampleQuestion = data;  // logic may need adjustment
  } 
}



// ngOnInit(): void {
//   this.form = this.formBuilder.group({
//     textbox: [''] // Initialize with an empty value
//   });
// }
