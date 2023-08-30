import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {GravityRushComponent} from './gravity-rush/gravity-rush.component';
import {ProfilComponent} from './profil/profil.component';
import {EditProfilComponent} from './profil/edit-profil/edit-profil.component';

const routes: Routes = [

  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'gravityRush', component: GravityRushComponent },
  { path: 'profil/edit/:id', component: EditProfilComponent },
  { path: 'profil/:id', component: ProfilComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
