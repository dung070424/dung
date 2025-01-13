import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HardcodeAuthenticationService } from '../hardcode-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private authService: HardcodeAuthenticationService,
    private router : Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');  

    if (role === 'ROLE_ADMIN') {
      
      return true;
    } else if (role === 'ROLE_USER') {
      
      if (state.url.includes('/welcome') || state.url.includes('/todos') || state.url === '/logout') {
        return true;
      } else {
        this.router.navigate(['/error']); 
        return false;
      }
    } else {
      
      this.router.navigate(['/login']);
      return false;
    }
  }
}
