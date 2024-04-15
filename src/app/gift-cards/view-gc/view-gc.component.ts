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
  searchInventory() {
    // Check if searchQuery is not present or empty
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      // Clone the cards array to filteredCards
      this.filteredCards = [...this.cards];
    } else {
      // Parse the search query as an integer
      const query = parseInt(this.searchQuery, 10);
      // Filter cards based on CardNumber matching the parsed query
      this.filteredCards = this.cards.filter((card) => card.CardNumber === query);
    }
  }

}
