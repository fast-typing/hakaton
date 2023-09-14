import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuth = false
  public isAuthModalVisible = false
  public isMobileModalVisible = false
  public chosenModal!: string
  public userData!: FormGroup

  constructor(
    private readonly cookiesService: CookiesService,
    private readonly fb: FormBuilder,
    private readonly route: Router,
  ) { }

  ngOnInit(): void {
    this.isAuth = !!this.cookiesService.getCookie('token')
    this.userData = this.fb.group({
      userName: [''],
      email: [''],
      password: [''],
    })
  }

  openModal(type: string) {
    this.chosenModal = type
    this.isAuthModalVisible = true
  }

  submit() {
    console.log(this.userData)
    this.cookiesService.setCookie('token', '1')
    this.isAuth = true
  }

  logout() {
    this.cookiesService.deleteCookie('token')
    this.isAuth = false
  }

  routeTo(path: string) {
    this.route.navigate([path])
    this.isMobileModalVisible = false
  }
}
