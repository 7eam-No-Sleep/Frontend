import { Component } from '@angular/core';
import { GiftCard } from './giftcard.model';
import { ViewGcComponent } from './view-gc/view-gc.component';
import { CreateGcComponent } from './create-gc/create-gc.component';
import { EditGcComponent } from './edit-gc/edit-gc.component';

@Component({
  selector: 'app-gift-cards',
  standalone: true,
  imports: [ViewGcComponent, CreateGcComponent, EditGcComponent],
  templateUrl: './gift-cards.component.html',
  styleUrl: './gift-cards.component.css'
})
export class GiftCardsComponent {

}
