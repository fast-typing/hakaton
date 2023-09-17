import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attraction, User } from 'src/app/interfaces/interface';
import { CookiesService } from 'src/app/services/cookies.service';
import { HTTPService } from 'src/app/services/http.service';
import { cities, categories, types } from 'src/app/app.const';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public userData!: FormGroup
  public attrData!: FormGroup
  public user!: User
  public userAttr!: Attraction[]
  public favoriteAttr!: Attraction[]
  public isModalVisible: boolean = false
  public loading: boolean = true
  public cities: string[] = cities
  public categories: string[] = categories
  public types: { name: string, icon: string }[] = [{ name: 'Избранное', icon: 'pi pi-heart' }, { name: 'Мои достопримечательности', icon: 'pi pi-user' }]
  public type: { name: string, icon: string } = this.types[0]
  public loadingRes: boolean = false

  constructor(
    private readonly http: HTTPService,
    private readonly cookiesService: CookiesService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    const refresh_token = this.cookiesService.getCookie('refresh_token') ?? ''
    this.http.getUserByToken(refresh_token).subscribe((res: any) => {
      const user = res
      this.userData = this.fb.group({
        userName: [user.username ?? ''],
        email: [user.email ?? ''],
        password: [user.password ?? ''],
      })

      this.http.getAllAttr().subscribe((attrs) => {
        this.userAttr = attrs.filter((item) => user.published_landmarks?.includes(item.id))
        this.favoriteAttr = attrs.filter((item) => user.favorite_landmarks?.includes(item.id)).map((item) => { item.isFavorite = true; return item })
        this.loading = false
      })
    })
    this.attrData = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      address: ['', [Validators.required]],
      categories: [[], [Validators.required]],
      description: ['', [Validators.maxLength(1000)]],
      img: [''],
      city: [cities[0]]
    })
  }

  changeType(obj: { name: string, icon: string }) {
    this.type = obj
  }

  createAttraction() {
      this.attrData.markAsUntouched()
      if (this.attrData.invalid) return

    this.loadingRes = true
    const data = this.attrData.value
    data.time = data.startTime + '-' + data.endTime
    data.address = data.address + ', ' + data.city
    data.rating = 0
    data.type = 'От народа'
    data.coordinates = [0, 0]
    delete data.endTime
    delete data.startTime
    delete data.city
    const access_token = this.cookiesService.getCookie('access_token') ?? ''
    this.http.createAttr(data, access_token).subscribe((res) => {
      this.messageService.add({ key: 'toast', severity: 'success', summary: 'Успех', detail: 'Вы успешно создали достопримечательность!' })
      this.loadingRes = false
      this.isModalVisible = false
    })
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible
  }
}
