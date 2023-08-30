import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          location.reload();
        } else if (err.status === 422) {
          // auto logout if 401 response returned from api
          console.log('error : ', err);
          if (err.error) {
            return throwError({error: err.error.data.title, body: err.error.data.body});
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        } else {
          console.log('interceptor : ', err);
          const error = err.error.message || err.statusText;
          return throwError(error);
        }
      }));
  }
}
