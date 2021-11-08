import { Injectable } from '@angular/core';
import { Semester, User } from '../interfaces/notas.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private createSemester:boolean = false;
  getCreateSemester():boolean{return this.createSemester;}
  setCreateSemester(active:boolean){this.createSemester = active;}

  private createSubject:boolean = false;
  getCreateSubject():boolean{return this.createSubject;}
  setCreateSubject(active:boolean){this.createSubject = active;}

  private createAssignment:boolean = false;
  getCreateAssignment():boolean{return this.createAssignment;}
  setCreateAssignment(active:boolean){this.createAssignment = active;}

  private semester!:Semester;
  getSemester():Semester{return this.semester;}
  setSemester(semester:Semester){this.semester = semester;}

  private user!:User;
  getUser():User{return this.user;}
  setUser(user:User){this.user = user;}




  constructor() { }
}
