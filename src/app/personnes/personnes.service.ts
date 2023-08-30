import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Personne} from '../models/personne.model';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {FileInput} from 'ngx-material-file-input';

@Injectable({
  providedIn: 'root'
})
export class PersonnesService {
  private readonly apiUrl = environment.apiUrl;
  private personneUrl = this.apiUrl + 'personnes';

  constructor(private http: HttpClient) {
  }

  // Retourne toutes les personnes
  getPersonnes(): Observable<Personne[]> {
    return this.http.get<Observable<any>>(this.personneUrl)
      .pipe(
        tap((rep: any) => console.log(rep.data)),
        map(rep => {
          return rep.data.map(x => Personne.parse(x));
        })
      );
  }


  getPersonne(id: number): Observable<Personne> {
    const url = `${this.personneUrl}/${id} `;
    return this.http.get<Observable<{}>>(url)
      .pipe(
        tap((rep: any) => console.log(rep)),
        map(p => Personne.parse(p.data)),
      );
  }


  updatePersonne(personne: Personne, file: FileInput, pwd: string): Observable<Personne> {
    const url = `${this.personneUrl}/${personne.id} `;
    const formData: FormData = new FormData();
    formData.append('nom', personne.nom);
    formData.append('prenom', personne.prenom);
    formData.append('pseudo', personne.pseudo);
    formData.append('devise', personne.devise);
    formData.append('email', personne.user.email);
    if (pwd) {
      formData.append('password', pwd);
    }
    formData.append('_method', 'PUT');
    if (file) {
      console.log('fichier avatar : ', file.fileNames);
      formData.append('avatar', file.files[0], file.fileNames);
    }
    return this.http.post<Observable<Personne>>(url, formData)
      .pipe(
        tap((rep: any) => console.log(rep)),
        map(p => Personne.parse(p.data)),
      );
  }
}
