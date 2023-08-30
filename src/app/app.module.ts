import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './shared/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorInterceptorService} from './shared/http-error-interceptor.service';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import {HomeModule} from './home/home.module';
import {AuthModule} from './auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NavComponent } from './layout/nav/nav.component';
import {AngularMaterialModule} from './angular-material.module';
import {PersonnesModule} from './personnes/personnes.module';
import {TachesModule} from './taches/taches.module';
import { GravityRushComponent } from './gravity-rush/gravity-rush.component';
import { LevelOneComponent } from './gravity-rush/level-one/level-one.component';
import { LevelTwoComponent } from './gravity-rush/level-two/level-two.component';
import { ProfilComponent } from './profil/profil.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { FormProfilComponent } from './profil/form-profil/form-profil.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProfilRoutingModule } from './profil/profil-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GravityRushComponent,
    NavComponent,
    LevelOneComponent,
    LevelTwoComponent,
    ProfilComponent,
    EditProfilComponent,
    FormProfilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule,
    AuthModule,
    PersonnesModule,
    TachesModule,
    FlexLayoutModule,
    AngularMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ProfilRoutingModule,
  ],
  providers: [AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    [{provide: LOCALE_ID, useValue: 'fr-FR'}]],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
