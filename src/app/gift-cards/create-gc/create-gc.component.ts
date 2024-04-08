import { Component } from '@angular/core';
import { CardsService } from '../../shared/cards.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-gc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-gc.component.html',
  styleUrl: './create-gc.component.css'
})
export class CreateGcComponent {
  Balance: string = '';
  Status: string = '';

  constructor(private cardsService: CardsService){}

  makeGiftCard(): void{
    const createdCard = {
      CardNumber: 0,
      Balance: parseFloat(this.Balance),
      Status: this.Status
    };

    this.cardsService.addCard(createdCard).subscribe({
      next: response =>{
        console.log('Gift Card Created Successfully:', response);
        this.Balance = '';
        this.Status = '';
        location.reload();
      },
      error: error=>{
        console.error('Error Adding Gift Card:', error);
      }
    });
  }

}
