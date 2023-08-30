import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../shared/auth-guard.service';
import {ListPersonnesComponent} from './list-personnes/list-personnes.component';
import {PersonnesComponent} from './personnes/personnes.component';
import {PersonnesHomeComponent} from './personnes-home/personnes-home.component';
import {PersonnesDetailsComponent} from './personnes-details/personnes-details.component';
import {EditPersonneComponent} from './edit-personne/edit-personne.component';
import {AuteurGuardService} from '../shared/auteur-guard.service';

const personnesRoutes: Routes = [
  {
    path: 'personnes',
    component: PersonnesComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'liste', component: ListPersonnesComponent},
      {path: ':id', component: PersonnesDetailsComponent, canActivateChild: [AuteurGuardService]},
      {path: 'edit/:id', component: EditPersonneComponent, canActivateChild: [AuthGuardService]},
      {path: '', component: PersonnesHomeComponent}
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(personnesRoutes)],
  exports: [RouterModule]
})
export class PersonnesRoutingModule {
}
