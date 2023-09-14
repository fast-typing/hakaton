import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Attraction } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})

export class AttractionsComponent {
  public attractions: Attraction[] = [
    { city: 'Ижевск', type: "official", isFavorite: false, categories: ['кафе', 'памятник', 'развлечение'], coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: { quantity: 1200, stars: 4.5 }, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { city: 'Ижевск', type: "official", isFavorite: true, categories: ['кафе', 'развлечение'], coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: { quantity: 102, stars: 3.9 }, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { city: 'Сарапул', type: "official", isFavorite: false, categories: ['кафе', 'культура', 'развлечение'], coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: { quantity: 34, stars: 2.1 }, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { city: 'Ижевск', type: "official", isFavorite: false, categories: ['памятник', 'развлечение'], coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: { quantity: 2391, stars: 5 }, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
  ]
  public cities: { name: string, img: string }[] = [
    { name: "Ижевск", img: "izhevsk.jpg" },
    { name: "Глазов", img: "glazov.jpg" },
    { name: "Сарапул", img: "sarapul.jpeg" },
    { name: "Воткинск", img: "votkinsk.jpg" }
  ]
  public imgs: string[] = ["main-1.jpg", "main-1.jpg", "main-1.jpg", "main-1.jpg", "main-1.jpg"]

  constructor(
    private readonly router: Router,
  ) { }

  routeToSearch(type: string) {
    this.router.navigate(['/search'], { queryParams: { type: type } })
  }
}
