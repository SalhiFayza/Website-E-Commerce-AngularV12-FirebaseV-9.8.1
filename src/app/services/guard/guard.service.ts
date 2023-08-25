import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { AuthservicesService } from '../authservices.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private authserv:AuthservicesService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise(resolve=>{
      this.authserv.currentUser$.subscribe((user)=>{
if(!user){
  resolve(true)
 
}else{
  this.router.navigate(['/']),
  resolve(false)
}
      })
    })
  }
}
