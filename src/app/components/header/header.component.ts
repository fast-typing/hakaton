import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuth = false

  constructor(
    private readonly cookiesService: CookiesService
  ) { }

  ngOnInit(): void {
    this.isAuth = !!this.cookiesService.getCookie('token')
  }
}
