import { Component } from '@angular/core';
import { CardsService } from '../../shared/cards.service';
import { GiftCard } from '../giftcard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-gc',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-gc.component.html',
  styleUrl: './edit-gc.component.css'
})
export class EditGcComponent {
    CardNumber: number =  0;
    Balance: string ='';
    Status: String = '';
  
  constructor( private cardsService: CardsService){}

  updateGiftCard(): void{
    const updatedCard = {
      CardNumber: this.CardNumber,
      Balance: parseFloat(this.Balance),
      Status: this.Status
    };

    this.cardsService.updateCard(updatedCard).subscribe({
      next: response =>{
        console.log('Gift Card update Successfully:', response);
        this.CardNumber = 0;
        this.Balance = '';
        this.Status ='';
      },
      error: error =>{
        console.error('Error Updating Gift Card:', error);
      }

    });
  }



}

