import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AssignmentResponse, AllAssignmentResponse } from '../interfaces/notaResponse.interface';
import { Observable, of } from 'rxjs';
import { Assignment } from '../interfaces/notas.interface';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  baseUrl:string = environment.baseUrl;
  token:string = `Bearer ${localStorage.getItem('token')}`;
  header:string = 'Authorization';

  refreshAssignment:boolean = false;
  getRefreshAssignment(){ this.refreshAssignment}
  setRefreshAssignment(active:boolean){this.refreshAssignment = active}

  constructor(private http:HttpClient) { }

  getAllAssignment(subjectId:number):Observable<AllAssignmentResponse>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/assignments/${subjectId}`
    return this.http.get<AllAssignmentResponse>(url,{headers});
  }

  getAssignment(assignmentId:number):Observable<AssignmentResponse>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/assignment/${assignmentId}`
    return this.http.get<AssignmentResponse>(url,{headers});
  }

  saveAssignment(subjectPerSemesterId:number,activityId:number,activityNumberId:number,assignment:Assignment):Observable<AssignmentResponse>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/assignment/${subjectPerSemesterId}/${activityId}/${activityNumberId}`
    return this.http.post<AssignmentResponse>(url,assignment,{headers});
  }

  updateAssignment(assignment:Assignment):Observable<AssignmentResponse>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/assignment`
    return this.http.put<AssignmentResponse>(url,assignment,{headers});
  }

  deleteAssignment(assignmentId:number){
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/assignment/${assignmentId}`
    return this.http.delete(url,{headers});
  }

   isYourAssignments(subjectId:number):Observable<boolean>{
    let isYour= of(false)
     this.getAllAssignment(subjectId).toPromise().then(
       resp => {
         console.log(resp)
         isYour = of(true)
       }
     )
     return isYour;
   }
   
}

