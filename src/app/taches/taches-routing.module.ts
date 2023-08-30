import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TachesComponent} from './taches/taches.component';
import {DetailsTacheComponent} from './details-tache/details-tache.component';
import {ListTachesComponent} from './list-taches/list-taches.component';
import {TachesDashboardComponent} from './taches-dashboard/taches-dashboard.component';


const adminRoutes: Routes = [
  {
    path: 'taches',
    component: TachesComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'list', component: ListTachesComponent },
          { path: ':id', component: DetailsTacheComponent },
          { path: '', component: TachesDashboardComponent }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class TachesRoutingModule { }
