import { Component, Input, OnInit } from '@angular/core';
import { Attraction } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() card!: Attraction

  getPrice(): string {
    const price = this.card.price
    return price == 0 ? 'Бесплатно' : price.toString() + '₽'
  }

  getDescription(): string {
    const info = this.card.description
    return info.length > 100 ? info.slice(0, 97) + '...' : info
  }
}
