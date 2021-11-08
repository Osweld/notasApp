import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  boolean {

        if(this.authService.existToken()){
            this.router.navigate(['./inicio'])
            return false;
        }
        return true;
        // const result = of(!this.authService.existToken()).pipe(
        //     tap(auth =>{
        //         if(auth){
        //             this.router.navigate(['/inicio']);
                    
        //         }
        //     })
        // )
        // console.log("auth")
        // return result.pipe(
        //     tap(auth =>{
        //         if(auth){
        //             this.router.navigate(['/inicio']);
                    
        //         }
        //     })
        // );
    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> |  boolean {
        
        if(this.authService.existToken()){
            this.router.navigate(['./inicio'])
            return false;
        }
        return true;
  }
}
