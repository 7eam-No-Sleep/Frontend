import { Component } from '@angular/core';
import { CardsService } from '../../shared/cards.service';
import { GiftCard } from '../giftcard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-gc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-gc.component.html',
  styleUrl: './view-gc.component.css'
})
export class ViewGcComponent {
  cards: GiftCard[] = [];
  filteredCards: GiftCard [] = [];
  searchQuery: string = '';

  constructor(private cardsService: CardsService){}

  ngOnInit(): void{
    this.getCards();
  }
  getCards(): void{
    this.cardsService.getCards()
    .subscribe(cards => this.cards = cards);
  }
  searchInventory(){
    if(!this.searchQuery || this.searchQuery==''){
      this.filteredCards = [...this.cards];
    }else{
      const query = parseInt(this.searchQuery);
      this.filteredCards = this.cards.filter((card)=>
        card.CardNumber === query
      );
    }
  }

}
