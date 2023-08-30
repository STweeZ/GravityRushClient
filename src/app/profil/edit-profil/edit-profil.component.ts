import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfilService} from '../profil.service';
import {Personne} from '../../models/personne.model';
import {FileInput} from 'ngx-material-file-input';


@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  loading = false;
  personne: Personne = null;

  constructor(private route: ActivatedRoute, private router: Router, private service: ProfilService) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.service.getPersonne(id).subscribe(legume => {
      this.personne = legume;
      this.loading = false;
    });
  }

  update($event: {personne: Personne, avatar: FileInput, pwd: string}) {
    this.service.updatePersonne($event.personne, $event.avatar, $event.pwd).subscribe(legume => {
      this.router.navigate(['./profil', this.personne.id]);
    });
  }
}
