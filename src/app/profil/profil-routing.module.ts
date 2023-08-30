import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfilComponent} from './profil.component';
import {EditProfilComponent} from './edit-profil/edit-profil.component';

const profilRoutes: Routes = [
  {
    path: 'profil',
    component: ProfilComponent,
    children: [
      {path: 'edit/', component: EditProfilComponent},
      {path: '', component: ProfilComponent}
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(profilRoutes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule {
}
