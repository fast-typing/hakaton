import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Attraction } from 'src/app/interfaces/interface';
import { CookiesService } from 'src/app/services/cookies.service';
import { HTTPService } from 'src/app/services/http.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() data!: Attraction
  public isModalVisible: boolean = false
  public starArr: number[] = [1, 2, 3, 4, 5]
  public loadingFav: boolean = false

  constructor(
    private http: HTTPService,
    private cookiesService: CookiesService,
    private readonly messageService: MessageService
  ) { }

  getPrice(): string {
    const price = this.data.price
    return price == 0 ? 'Бесплатно' : price.toString() + '₽'
  }

  getCategorie(): string {
    return this.data.categories.join('•')
  }

  getAddress(): string {
    return this.data.address.slice(0, 10) + '...'
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible
  }

  toggleFavorite(id: string) {
    const access_token = this.cookiesService.getCookie('access_token')

    if (access_token) {
      this.loadingFav = true
      if (this.data.isFavorite) {
        this.http.removeFromFavorite(id, access_token).subscribe((res) => {
          this.data.isFavorite = !this.data.isFavorite
          this.loadingFav = false
        })
      } else {
        this.http.addToFavorite(id, access_token).subscribe((res) => {
          this.data.isFavorite = !this.data.isFavorite
          this.loadingFav = false
        })
      }
    } else {
      this.messageService.add({ key: 'toast', severity: 'info', summary: 'Войдите в аккаунт', detail: 'Эта функция доступно лишь авторизованным пользователям' })
    }
  }
}
