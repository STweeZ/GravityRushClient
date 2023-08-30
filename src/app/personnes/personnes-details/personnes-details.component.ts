import {Component, OnInit} from '@angular/core';
import {Personne} from '../../models/personne.model';
import {PersonnesService} from '../personnes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-personnes-details',
  templateUrl: './personnes-details.component.html',
  styleUrls: ['./personnes-details.component.css']
})
export class PersonnesDetailsComponent implements OnInit {
  loading: boolean = false;
  personne: Personne;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: PersonnesService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.service.getPersonne(id).subscribe(rep => {
        console.log(rep);
        this.personne = rep;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(`${error} failed: ${error.message}`, 'Error')
          .onHidden
          .subscribe(t => this.router.navigate(['./personnes/liste']));
      });
  }

  editPersonne() {
    this.router.navigate(['./personnes/edit', this.personne.id]);
  }

}
