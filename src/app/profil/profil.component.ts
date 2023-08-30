import {Component, OnInit} from '@angular/core';
import {Personne} from '../models/personne.model';
import {ProfilService} from './profil.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Tache} from '../models/tache.model';
import {TachesService} from '../taches/taches.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  loading: boolean = false;
  personne: Personne;
  lesTaches: Tache[];
  lesJeux: Tache[][];
  selectedTache: Tache;
  displayedColumns: string[] = ['position', 'score', 'description', 'date'];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ProfilService,
              private toastr: ToastrService, private serviceTaches: TachesService) {
    this.lesJeux = [[], []];
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.service.getPersonne(id).subscribe(rep => {
        console.log(rep);
        this.personne = rep;
      },
      error => {
        this.loading = false;
        this.toastr.error(`${error} failed: ${error.message}`, 'Error')
          .onHidden
          .subscribe(t => this.router.navigate(['./']));
      });
    this.serviceTaches.getTaches().subscribe(taches => {
      this.lesTaches = taches;
      console.log(taches);
      this.lesTaches = this.ofThePlayer();
      this.sortedJeux();
      this.doClassements();
      this.loading = false;
    });

  }

  ofThePlayer() {
    const tab: Tache[] = [];
    this.lesTaches.forEach((v: Tache): void => {
      if (v.player === this.personne.pseudo) {
        tab.push(v);
      }
    });
    return tab;
  }

  sortedJeux() {
    this.lesTaches.sort((x: Tache, y: Tache) => {
      if (x.jeu <= y.jeu) {
        return -1;
      }
      return 1;
    });
    return this.lesTaches;
  }

  sortedTaches(jeu: Tache[]) {
    return jeu.sort((x: Tache, y: Tache) => {
      if (x.score <= y.score) {
        return 1;
      }
      return -1;
    });
  }

  doClassements() {
    this.lesJeux[0].push(this.lesTaches[0]);
    let compteurJeux = 0;
    for (let i = 1; i < this.lesTaches.length; i++) {
      if (this.lesTaches[i].jeu === this.lesTaches[i - 1].jeu) {
        this.lesJeux[compteurJeux].push(this.lesTaches[i]);
      } else {
        this.lesJeux[++compteurJeux].push(this.lesTaches[i]);
      }
    }
    return this.lesJeux;
  }

  selectedRow(tache: Tache) {
    if (this.isSelected(tache)) {
      this.selectedTache = null;
    } else {
      this.selectedTache = tache;
      console.log('Tache sélectionnée : ', tache.id);
      this.router.navigate(['./taches', this.selectedTache.id]);
    }
  }

  isSelected(tache: Tache) {
    return this.selectedTache != null && this.selectedTache.id === tache.id;
  }

  editPersonne() {
    this.router.navigate(['./profil/edit', this.personne.id]);
  }

}
