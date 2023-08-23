import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransporteurAuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const jwtTransporteur = localStorage.getItem('jwtTransporteur');

    if (jwtTransporteur) {
      return true; // Allow access for authenticated transporteurs
    } else {
      this.router.navigate(['/demeFormFirst']);
      return false;
    }
  }
}
