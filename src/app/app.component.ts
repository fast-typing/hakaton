import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookiesService } from './services/cookies.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  constructor(public messageService: MessageService) { }
}