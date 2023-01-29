import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  loginAuth : any;
  authorizedflag : boolean = false;
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginAuth = localStorage.getItem('UserObject');
    this.loginAuth = JSON.parse(this.loginAuth);
    console.log(route);
    let roles = route.data.route as Array<string>;
    if(this.loginAuth){  
      this.authorizedflag = false;
      console.log(roles)
      for(var i = 0; i< roles?.length; i++){
        if( roles[i].toString() == this.loginAuth.userId){
          this.authorizedflag = true;
        }    
      }
      if(this.authorizedflag == true){
        return true;
      }
      else {
        this.router.navigateByUrl('/dashboard-my-profile');
        return false;
      }
    }
    else{
      localStorage.removeItem('UserObject');  
      this.router.navigateByUrl('');
    }
    // return false;
  }
  
}
