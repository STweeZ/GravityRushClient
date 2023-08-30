import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TachesRoutingModule } from './taches-routing.module';
import { TachesDashboardComponent } from './taches-dashboard/taches-dashboard.component';
import { TachesComponent } from './taches/taches.component';
import { DetailsTacheComponent } from './details-tache/details-tache.component';
import { ListTachesComponent } from './list-taches/list-taches.component';
import {AngularMaterialModule} from '../angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [TachesDashboardComponent, TachesComponent, DetailsTacheComponent, ListTachesComponent],
  imports: [
    CommonModule,
    TachesRoutingModule,
    AngularMaterialModule,
    ToastrModule.forRoot(),
    FlexLayoutModule
  ]
})
export class TachesModule { }
