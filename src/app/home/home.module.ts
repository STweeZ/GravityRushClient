import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {AngularMaterialModule} from '../angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
