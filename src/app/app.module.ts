import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './home/header/header.component';
import {PackCategoriesComponent} from './home/pack-categories/pack-categories.component';
import {PackNewCardsComponent} from './home/pack-new-cards/pack-new-cards.component';
import {PackProvidersComponent} from './home/pack-providers/pack-providers.component';
import {FormsModule} from '@angular/forms';
import {ShoopingItemsComponent} from './shooping-items/shooping-items.component';
import {CarddetailsComponent} from './carddetails/carddetails.component';
import {ProviderComponent} from './provider/provider.component';
import {TestComponent} from './test/test.component';
import {JwtModule} from '@auth0/angular-jwt';
import {CardsComponent} from './cards/cards.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {CustomizecardCanvasComponent} from './customizecardcanvas/customizecardcanvas.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

const appRouter: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: 'home', component: HomeComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign', component: SignupComponent},
  {path: 'shoppingItems', component: ShoopingItemsComponent},
  {path: 'carddetails/:id', component: CarddetailsComponent},
  {path: 'provider', component: ProviderComponent},
  {path: 'test', component: TestComponent},
  {path: 'testcanvas/:id', component: CustomizecardCanvasComponent},
  {path: 'cards', component: CardsComponent}
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    PackCategoriesComponent,
    PackNewCardsComponent,
    PackProvidersComponent,
    ShoopingItemsComponent,
    CarddetailsComponent,
    ProviderComponent,
    TestComponent,
    CardsComponent,
    CustomizecardCanvasComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouter),
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/login']
      }
    }),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
