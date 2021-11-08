import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadGuard implements CanActivate, CanLoad {

  constructor(private subjectService: SubjectService, private router: Router,private activatedRoute:ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let subjectId = 0;
      if(this.subjectService.getSubjectPerSemesterId() === 0){
       subjectId = route.params.id;
      }else{
        subjectId = this.subjectService.getSubjectPerSemesterId()
      }
      return this.subjectService.getSubject(subjectId).pipe(
        map(resp =>{
         if(resp.existSubject){
          return true;
         }else{
           this.router.navigate(['/inicio']);
          return false;
         }
        })
      )
    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      let subjectId = 0;
      if(this.subjectService.getSubjectPerSemesterId() === 0){
        this.activatedRoute.params.subscribe(({id}) => subjectId = id)
      }else{
        subjectId = this.subjectService.getSubjectPerSemesterId()
      }

      return this.subjectService.getSubject(subjectId).pipe(
        map(resp =>{
         if(resp.existSubject){
          return true;
         }else{
           this.router.navigate(['/inicio']);
          return false;
         }
        })
      )
  }
}
