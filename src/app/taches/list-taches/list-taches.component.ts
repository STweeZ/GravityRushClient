import { Component, OnInit } from '@angular/core';
import {Tache} from '../../models/tache.model';
import {Router} from '@angular/router';
import {TachesService} from '../taches.service';

@Component({
  selector: 'app-list-personnes',
  templateUrl: './list-taches.component.html',
  styleUrls: ['./list-taches.component.css']
})
export class ListTachesComponent implements OnInit {
  loading = false;
  lesTaches: Tache[];
  lesJeux: Tache[][];
  selectedTache: Tache;
  displayedColumns: string[] = ['position', 'player', 'score', 'description', 'date'];

  constructor(private router: Router, private service: TachesService) {
    this.lesJeux = [[], []];
  }

  ngOnInit() {
    this.loading = true;
    this.service.getTaches().subscribe(taches => {
      this.lesTaches = taches;
      console.log(taches);
      this.sortedJeux();
      this.doClassements();
      this.loading = false;
    });
  }

  sortedJeux() {
    return this.lesTaches.sort((x: Tache, y: Tache) => {
      if (x.jeu <= y.jeu) {
        return -1;
      }
      return 1;
    });
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

}
