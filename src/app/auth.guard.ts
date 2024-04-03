import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot)=> {
if(inject(AuthService).isLoggedIn()){
  return true;
} else{
  inject(Router).navigate(['/login']);
  return false;
}
};

