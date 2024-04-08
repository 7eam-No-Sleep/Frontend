import { Component } from '@angular/core';
import { CardsService } from '../../shared/cards.service';
import { GiftCard } from '../giftcard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-gc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-gc.component.html',
  styleUrl: './view-gc.component.css'
})
export class ViewGcComponent {
  cards: GiftCard[] = [];

  constructor(private cardsService: CardsService){}

  ngOnInit(): void{
    this.getCards();
  }
  getCards(): void{
    this.cardsService.getCards()
    .subscribe(cards => this.cards = cards);
  }

}
