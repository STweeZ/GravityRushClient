import { Component, OnInit } from '@angular/core';
import {Tache} from '../../models/tache.model';
import {TachesService} from '../taches.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-crises',
  templateUrl: './details-tache.component.html',
  styleUrls: ['./details-tache.component.css']
})
export class DetailsTacheComponent implements OnInit {
  loading: boolean = false;
  tache: Tache;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: TachesService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.service.getTache(id).subscribe(rep => {
        console.log(rep);
        this.tache = rep;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(`${error} failed: ${error.message}`, 'Error')
          .onHidden
          .subscribe(t => this.router.navigate(['./taches/liste']));
      });
  }

}
