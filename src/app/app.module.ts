import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { SearchComponent } from './pages/search/search.component';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AuthGuard } from './guard/auth.guard';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

const mapConfig: YaConfig = {
  apikey: '54f1889a-0cc9-49d2-bfa1-c8d65d1fe91e',
  lang: 'ru_RU',
};

const routes: Routes = [
  { path: '', component: AttractionsComponent, },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
]

@NgModule({
  declarations: [
    AppComponent,
    AttractionsComponent,
    ProfileComponent,
    HeaderComponent,
    CardComponent,
    SearchComponent,
  ],
  imports: [
    ToastModule,
    RatingModule,
    DividerModule,
    FormsModule,
    SelectButtonModule,
    InputNumberModule,
    InputMaskModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CarouselModule,
    DropdownModule,
    InputTextModule,
    AngularYandexMapsModule,
    DialogModule,
    BrowserModule,
    HttpClientModule,
    ProgressSpinnerModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
  ],
  providers: [CookiesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
