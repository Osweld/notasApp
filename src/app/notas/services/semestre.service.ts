import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateSemester } from '../interfaces/utils.interface';
import { Observable } from 'rxjs';
import { SemesterResponse, AllSemesterResponse } from '../interfaces/notaResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {

  baseUrl:string = environment.baseUrl;
  token:string = `Bearer ${localStorage.getItem('token') || ''}`
  header:string = 'Authorization';

  private refreshSemester:boolean = false;
  getRefreshSemester(){return this.refreshSemester;}
  setRefreshSemester(refresh:boolean){this.refreshSemester = refresh;}


  constructor(private http:HttpClient) { }

  getAllSemester():Observable<AllSemesterResponse>{
    const headers = new HttpHeaders().set(this.header,this.token);
    const url = `${this.baseUrl}/api/semester`;
    return this.http.get<AllSemesterResponse>(url,{headers});
  }

  saveSemester(createSemester:CreateSemester):Observable<SemesterResponse>{
    const headers = new HttpHeaders().set(this.header,this.token)
    const url = `${this.baseUrl}/api/semester/${createSemester.cycle}/${createSemester.year}`
    return this.http.post<SemesterResponse>(url,createSemester,{headers})
  }

  
}
