import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const jwtTransporteur = localStorage.getItem('jwtUser');

    if (jwtTransporteur) {
      return true; // Allow access for authenticated transporteurs
    } else {
      alert("you need to login first")
      this.router.navigate(['/devisResult']);
      return false;
    }
  }
}
