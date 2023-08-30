import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Personne} from '../models/personne.model';
import {map, tap} from 'rxjs/operators';

// Setup headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private registerUrl = this.apiUrl + 'register';
  private loginUrl = this.apiUrl + 'login';
  private currentUserSubject: BehaviorSubject<Personne>;
  public currentUser: Observable<Personne>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Personne>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Personne {
    return this.currentUserSubject.value;
  }

  onLogin(user: any): Observable<{} | Personne> {
    const request = JSON.stringify({email: user.email, password: user.password});
    const url = this.loginUrl;
    return this.http.post(this.loginUrl, request, httpOptions)
      .pipe(
        tap(data => {
          console.log('le retour', data);
        }),
        map((data: any) => {
          const personne = Personne.parse(data.data.personne);
          this.storeToken(data, personne);
          return personne;
        }));
  }

  storeToken(data: any, personne: Personne) {
    personne.user.accessToken = data.data.token;
    localStorage.setItem('currentUser', JSON.stringify(personne));
    console.log('Personne : ', personne);
    this.currentUserSubject.next(personne);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  onRegister(valeur: { personne: Personne, pwd: string }) {
    const request = JSON.stringify({
      nom: valeur.personne.nom, prenom: valeur.personne.prenom, pseudo: valeur.personne.pseudo, name: valeur.personne.user.name,
      email: valeur.personne.user.email, password: valeur.pwd
    });

    return this.http.post(this.registerUrl, request, httpOptions)
      .pipe(
        tap(data => {
          console.log('le retour du register', data);
        }),
        map((data: any) => {
          const personne = Personne.parse(data.data.personne);
          this.storeToken(data, personne);
          return personne;
        }));
  }
}
