import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attraction, User } from 'src/app/interfaces/interface';
import { CookiesService } from 'src/app/services/cookies.service';
import { HTTPService } from 'src/app/services/http.service';

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
  public cities: string[] = ["Ижевск", "Глазов", "Сарапул", "Воткинск",]
  public types: string[] = ['Избранное', 'Мои достопримечательности'] 
  public type: string = this.types[0]

  constructor(
    private readonly http: HTTPService,
    private readonly cookiesService: CookiesService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    const token = this.cookiesService.getCookie('token')
    // this.http.getUserByToken(token!).subscribe((res) => {
    this.userData = this.fb.group({
      userName: [''],
      email: [''],
      password: [''],
    })
    // })
    this.attrData = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      time: ['', [Validators.required]],
      address: ['', [Validators.required]],
      description: [''],
      city: ['']
    })
  }

  submit() {

  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible
  }
}
