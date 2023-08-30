import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tache} from '../models/tache.model';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TachesService {
  private readonly apiUrl = environment.apiUrl;
  private tacheUrl = this.apiUrl + 'taches';

  constructor(private http: HttpClient) {
  }

  // Retourne toutes les taches
  getTaches(): Observable<Tache[]> {
    return this.http.get<Observable<any>>(this.tacheUrl)
      .pipe(
        tap((rep: any) => console.log(rep.data)),
        map(rep => {
          return rep.data.map(x => Tache.parse(x));
        })
      );
  }


  getTache(id: number): Observable<Tache> {
    const url = `${this.tacheUrl}/${id} `;
    return this.http.get<Observable<{}>>(url)
      .pipe(
        tap((rep: any) => console.log(rep)),
        map(p => Tache.parse(p.data)),
      );
  }
}
