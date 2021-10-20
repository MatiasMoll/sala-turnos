import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IngresoService } from '../services/ingreso/ingreso.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedUserGuard implements CanActivate {
  constructor(
    public ingresoService:IngresoService
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.ingresoService.isLogged;
  }
  
}
