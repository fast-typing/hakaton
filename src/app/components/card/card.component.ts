import { Component, Input, OnInit } from '@angular/core';
import { Attraction } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() data!: Attraction
  public isModalVisible: boolean = false

  getPrice(): string {
    const price = this.data.price
    return price == 0 ? 'Бесплатно' : price.toString() + '₽'
  }

  getCategorie(): string {
    return this.data.categories.join('•')
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible
  }

  toggleFavorite() {
    console.log(1)
    this.data.isFavorite = !this.data.isFavorite
  }
}
