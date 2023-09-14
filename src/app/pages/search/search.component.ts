import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Attraction } from 'src/app/interfaces/interface';
import { HTTPService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public filter!: FormGroup
  public type!: string

  public attractions: Attraction[] = [
    { city: 'Ижевск', type: "official", isFavorite: false, categories: ['Кафе', 'Духовное', 'Сооружения'], coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: { quantity: 1200, stars: 4.5 }, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { city: 'Ижевск', type: "official", isFavorite: true, categories: ['Развлечение'], coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: { quantity: 102, stars: 3.9 }, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { city: 'Сарапул', type: "official", isFavorite: false, categories: ['Сооружения', 'Музеи', 'Парки'], coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: { quantity: 34, stars: 2.1 }, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
    { city: 'Ижевск', type: "official", isFavorite: false, categories: ['Памятники', 'Развлечение'], coordinates: [55.751952, 37.600739], address: 'Соцгород, Первомайский район, Ижевск', time: 'Круглосуточно', img: 'dasd/asdasd', id: '1', title: 'Пельмень на вилке', rating: { quantity: 2391, stars: 5 }, price: 0, reviews: [], description: 'Этот пельмень очень вкусный я его вчера ел мне невероятно понрмалиось всем рекомендую. Всем пока я пвкусно поел!!1' },
  ]
  public filteredAttractions: Attraction[] = this.attractions

  public types: { value: string, name: string }[] = [{ value: 'official', name: 'Официальное' }, { value: 'public', name: 'От народа' }]
  public cities: string[] = ["Ижевск", "Глазов", "Сарапул", "Воткинск",]
  public categories: string[] = ["Памятники", "Музеи", "Сооружения", "Парки", "Развлечение", "Культура", "Духовное", "Кафе"]
  // public selectedType: { value: string, name: string } = { value: 'official', name: 'Официальное' }
  // public types: string[] = ['Официальное', 'От народа']

  constructor(
    private readonly fb: FormBuilder,
    private readonly actRoute: ActivatedRoute,
    private readonly http: HTTPService,
  ) { }

  ngOnInit(): void {
    this.filter = this.fb.group({
      types: [],
      cities: [],
      categories: [],
    })

    this.filter.valueChanges.subscribe((form) => {
      this.filteredAttractions = this.attractions

      const types = form.types
      if (types?.length) {
        this.filteredAttractions = this.filteredAttractions.filter((attr: Attraction) => {
          return types.includes(attr.type)
        })
      }
      console.log(form)

      const cities = form.cities
      if (cities?.length) {
        this.filteredAttractions = this.filteredAttractions.filter((attr: Attraction) => {
          return cities.includes(attr.city)
        })
      }

      const categories = form.categories
      if (categories?.length) {
        this.filteredAttractions = this.filteredAttractions.filter((attr: Attraction) => {
          return attr.categories.filter((category) => {
            return categories.includes(category)
          }).length == categories.length
        })
      }
    })

    // this.http.getAttractions().subscribe((res) => {
    //   if (!res) return
    //   this.attractions = res
    //   this.filteredAttractions = res
    // })

    this.actRoute.queryParams.subscribe((params) => {
      if (params['type']) {
        const type = params['type']
        const queryTypes = this.types.find((item) => item.value === type)?.value
        this.filter.patchValue({
          types: queryTypes?.length ? [queryTypes] : []
        })
      }

      if (params['city']) {
        const city = params['city']
        const queryCities = 
        this.filter.patchValue({
          cities: this.cities.filter((item) => item === city) ?? []
        })
      }
    })
  }

  submit() {

  }
}