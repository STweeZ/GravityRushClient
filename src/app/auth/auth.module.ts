import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {AuthRoutingModule} from './auth-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AuthRoutingModule,
    FlexLayoutModule
  ]
})
export class AuthModule { }
