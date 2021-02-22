import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CareersResponse } from '../interfaces/notas.interface';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  baseUrl:string = environment.baseUrl;
  getCareers():Observable<CareersResponse>{
    const url = `${this.baseUrl}/api/utils/career`
    return this.http.get<CareersResponse>(url);
  }
  constructor(private http:HttpClient) { }
}
