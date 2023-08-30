import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuteurGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser.user.role.indexOf('joueur') >= 0) {
      // logged in so return true
      return true;
    }

    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
