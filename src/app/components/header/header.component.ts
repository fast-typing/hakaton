import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookiesService } from 'src/app/services/cookies.service';
import { HTTPService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuth = false
  public isAuthModalVisible = false //
  public isMobileModalVisible = false //
  public chosenModal!: string //
  public userData!: FormGroup

  constructor(
    private readonly cookiesService: CookiesService,
    private readonly fb: FormBuilder,
    private readonly route: Router,
    private readonly http: HTTPService,
    private readonly messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.isAuth = !!this.cookiesService.getCookie('access_token')
    this.userData = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  openModal(type: string) {
    this.chosenModal = type
    this.userData.patchValue({
      username: '',
      password: '',
      email: '',
    })
    this.userData.markAsUntouched()
    this.isAuthModalVisible = true
  }

  submit() {
    if (this.chosenModal == 'Регистрация') {
      this.registration()
    } else if (this.chosenModal == 'Вход') {
      this.login()
    }
  }

  registration(): void {
    if (this.userData.invalid) return

    const value = this.userData.value
    this.http.registration(value).subscribe({
      next: ((res) => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Успех', detail: 'Вы зарегистрировались!' })
        this.isAuthModalVisible = false
      }),
      error: ((error) => {
        console.log(error)
        this.messageService.add({ key: 'toast', severity: 'error', summary: 'Ошибка', detail: 'Что-то пошло не так... :(' })
      })
    })
  }

  login() {
    if (!this.userData.get('userName')?.valid && !this.userData.get('password')?.valid) return

    const value = this.userData.value
    delete value.email
    this.http.login(value).subscribe({
      next: ((res: { access_token: string, refresh_token: string }) => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Успех', detail: 'Вы авторизовались!' })
        this.userData.patchValue({
          username: '',
          password: '',
          email: '',
        })
        this.isAuthModalVisible = false
        const access_token = res['access_token']
        const refresh_token = res['refresh_token']
        if (access_token && refresh_token) {
          this.isAuth = true
          this.cookiesService.setCookie('access_token', access_token)
          this.cookiesService.setCookie('refresh_token', refresh_token)
          location.reload()
        }
      }),
      error: ((error) => {
        console.log(error)
        this.messageService.add({ key: 'toast', severity: 'error', summary: 'Ошибка', detail: 'Неккоректное имя или пароль!' })
      })
    })
  }

  logout() {
    this.cookiesService.deleteCookie('access_token')
    this.cookiesService.deleteCookie('refresh_token')
    location.reload()
    this.isAuth = false
  }

  routeTo(path: string) {
    this.route.navigate([path])
    this.isMobileModalVisible = false
  }
}
