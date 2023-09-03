import { Component, OnInit } from '@angular/core';
import { Attraction } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})

export class AttractionsComponent implements OnInit {
  public attractions: Attraction[] = [
    { coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: 4.7, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: 4.7, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: 4.7, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: 4.7, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
  ]
  public visible: boolean = false
  public chosenAttraction!: Attraction

  ngOnInit(): void {

  }

  openAttr(attr: Attraction) {
    this.chosenAttraction = attr
    this.visible = true
  }
}
