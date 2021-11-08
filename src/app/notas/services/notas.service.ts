import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CareersResponse } from '../interfaces/notas.interface';
import { CycleResponse, YearResponse, UserResponse, SubjectsPerCareerResponse, ActivityResponse, ActivityNumberResponse } from '../interfaces/notaResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  baseUrl:string = environment.baseUrl;
  token:string = `Bearer ${localStorage.getItem('token') || ''}`;
  header:string = 'Authorization';

  getUser():Observable<UserResponse>{
    const url = `${this.baseUrl}/api/user`;
    const headers = new HttpHeaders().set(this.header,this.token)
    return this.http.get<UserResponse>(url,{headers});
  }

  getSubjectsPerCareer(idCareer:number,idCycle:number):Observable<SubjectsPerCareerResponse>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/utils/subjectspercareer/${idCareer}/${idCycle}`;
    return this.http.get<SubjectsPerCareerResponse>(url,{headers});
  }

  getCareers():Observable<CareersResponse>{
    const url = `${this.baseUrl}/api/utils/career`;
    return this.http.get<CareersResponse>(url);
  }

  getCycles():Observable<CycleResponse>{
    const url = `${this.baseUrl}/api/utils/cycle`;
    const headers = new HttpHeaders().set(this.header,this.token)
    return this.http.get<CycleResponse>(url,{headers});
  }

  getYear():Observable<YearResponse>{
    const url = `${this.baseUrl}/api/utils/year`;
    const headers = new HttpHeaders().set(this.header,this.token)
    return this.http.get<YearResponse>(url,{headers});
  }

  getActivity():Observable<ActivityResponse>{
    const url = `${this.baseUrl}/api/utils/activity`;
    const headers = new HttpHeaders().set(this.header,this.token)
    return this.http.get<ActivityResponse>(url,{headers});
  }

  getActivityNumber():Observable<ActivityNumberResponse>{
    const url = `${this.baseUrl}/api/utils/activitynumber`;
    const headers = new HttpHeaders().set(this.header,this.token)
    return this.http.get<ActivityNumberResponse>(url,{headers});
  }


  constructor(private http:HttpClient) { }
}
