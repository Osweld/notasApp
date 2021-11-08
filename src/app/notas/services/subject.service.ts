import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CheckSubject, SaveSubjectPerSemesterResponse, SubjectPerSemesterResponse } from '../interfaces/notaResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  baseUrl:string = environment.baseUrl;
  token:string = `Bearer ${localStorage.getItem('token') || ''}`
  header:string = 'Authorization';

  private refreshSubject:boolean = false;
  getRefreshSubject(){return this.refreshSubject;}
  setRefreshSubject(refresh:boolean){this.refreshSubject = refresh;}

  private subjectPerSemesterId:number = 0;
  getSubjectPerSemesterId(){return this.subjectPerSemesterId}
  setSubjectPerSemesterId(id:number){this.subjectPerSemesterId = id;}


  constructor(private http:HttpClient) { }

  getAllSubjects(semesterId:number):Observable<SubjectPerSemesterResponse>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/subjectspersemester/${semesterId}`;
    return this.http.get<SubjectPerSemesterResponse>(url,{headers});
  }

  saveSubject(subjectPercareerId:number,semesterId:number):Observable<SaveSubjectPerSemesterResponse>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/subjectspersemester/${subjectPercareerId}/${semesterId}`;
    return this.http.post<SaveSubjectPerSemesterResponse>(url,semesterId,{headers});
  }

  getSubject(subjectPerSemesterId:number):Observable<CheckSubject>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/subjectpersemester/exists/${subjectPerSemesterId}`;
    return this.http.get<CheckSubject>(url,{headers});
  }


}
