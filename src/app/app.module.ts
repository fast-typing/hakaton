import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AttractionsComponent } from './pages/attractions/attractions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { CookiesService } from './services/cookies.service';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularYandexMapsModule, YaConfig} from 'angular8-yandex-maps';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InputTextModule } from 'primeng/inputtext';

const mapConfig: YaConfig = {
  apikey: '54f1889a-0cc9-49d2-bfa1-c8d65d1fe91e',
  lang: 'ru_RU',
};

const routes: Routes = [
  { path: 'attractions', component: AttractionsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AttractionsComponent,
    ProfileComponent,
    HeaderComponent,
    CardComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    InputTextModule,
    AngularYandexMapsModule,
    DialogModule,
    BrowserModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ButtonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [CookiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
