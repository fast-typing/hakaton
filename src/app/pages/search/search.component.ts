import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Attraction } from 'src/app/interfaces/interface';
import { HTTPService } from 'src/app/services/http.service';
import { cities, categories, types } from 'src/app/app.const';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public types: string[] = types
  public cities: string[] = cities
  public categories: string[] = categories

  public attractions!: Attraction[]
  public filteredAttractions!: Attraction[]

  public filter!: FormGroup
  public type!: string
  public loading: boolean = true

  constructor(
    private readonly fb: FormBuilder,
    private readonly actRoute: ActivatedRoute,
    private readonly http: HTTPService,
    private readonly cookiesService: CookiesService,
  ) { }

  ngOnInit(): void {
    this.http.getAllAttr().subscribe((res: Attraction[]) => {
      if (!res) return
      this.attractions = res
      this.filteredAttractions = res

      const access_token = this.cookiesService.getCookie('access_token')
      if (access_token) {
        this.http.getFavoriteAttr(access_token).subscribe((ids: string[]) => {
          this.attractions = res.map((item) => {
            if (ids.includes(item.id)) { item.isFavorite = true }
            return item
          })
          this.loading = false
        })
      } else {
        this.loading = false
      }

      this.filter = this.fb.group({
        types: [],
        cities: [],
        categories: [],
      })

      this.filterByFormValue()

      this.filterByQuery()
    })
  }

  filterByFormValue(): void {
    this.filter.valueChanges.subscribe((form) => {
      this.filteredAttractions = this.attractions

      const types = form.types
      if (types?.length) {
        this.filteredAttractions = this.filteredAttractions.filter((attr: Attraction) => {
          return types.includes(attr.type)
        })
      }

      const cities = form.cities?.map((item: string) => item.toLocaleLowerCase())
      if (cities?.length) {
        this.filteredAttractions = this.filteredAttractions.filter((attr: Attraction) => {
          const address = attr.address.replace(/\s/g, '').toLocaleLowerCase().split(',')
          const city = address.at(-1)
          return cities.includes(city)
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
  }

  filterByQuery(): void {
    this.actRoute.queryParams.subscribe((params) => {
      if (params['type']) {
        const type = params['type']
        const queryTypes = this.types.find((item) => item === type)
        this.filter.patchValue({
          types: queryTypes?.length ? [queryTypes] : []
        })
      }

      if (params['city']) {
        const city = params['city']
        this.filter.patchValue({
          cities: this.cities.filter((item) => item === city) ?? []
        })
      }
    })
  }
}