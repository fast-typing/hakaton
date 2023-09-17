import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Attraction } from 'src/app/interfaces/interface';
import { cities } from 'src/app/app.const';
import { HTTPService } from 'src/app/services/http.service';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})

export class AttractionsComponent implements OnInit {
  public officilAttrs!: Attraction[]
  public publicAttrs!: Attraction[]
  public cities: { name: string, img: string }[] = [
    { name: cities[0], img: "izhevsk.jpg" },
    { name: cities[1], img: "glazov.jpg" },
    { name: cities[2], img: "sarapul.jpeg" },
    { name: cities[3], img: "votkinsk.jpg" }
  ]
  public imgs: string[] = ["main-1.jpg", "main-1.jpg", "main-1.jpg", "main-1.jpg", "main-1.jpg"]

  constructor(
    private readonly router: Router,
    private readonly http: HTTPService,
    private readonly cookiesService: CookiesService,
  ) { }

  ngOnInit(): void {
    this.http.getAllAttr().subscribe((res: Attraction[]) => {
      const access_token = this.cookiesService.getCookie('access_token')
      if (access_token) {
        this.http.getFavoriteAttr(access_token).subscribe((ids: string[]) => {
          this.officilAttrs = res.filter((item) => item.type == 'Официальный').map((item) => {
            if (ids.includes(item.id)) { item.isFavorite = true }
            return item
          })

          this.publicAttrs = res.filter((item) => item.type == 'От народа').map((item) => {
            if (ids.includes(item.id)) { item.isFavorite = true }
            return item
          })
        })
      } else {
        this.officilAttrs = res.filter((item) => item.type == 'Официальный')
        this.publicAttrs = res.filter((item) => item.type == 'От народа')
      }
    })
  }

  routeToSearch(type: string) {
    this.router.navigate(['/search'], { queryParams: { type: type } })
  }
}