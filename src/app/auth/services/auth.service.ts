import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/notas/interfaces/notas.interface';
import { environment } from 'src/environments/environment';
import { Auth, LoginResponse, TokenRefresh} from '../interfaces/auth.interface';
import { RegistrationResponse } from '../../notas/interfaces/notaResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  login(user: Auth): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/login`
    return this.http.post<LoginResponse>(url, user);
  }

  registration(user:User,careerId:string):Observable<RegistrationResponse>{
    const url = `${this.baseUrl}/api/registration/${careerId}`
    return this.http.post<RegistrationResponse>(url,user);

  }

  sendResetPassword(email:string){
    const url = `${this.baseUrl}/api/token/resetpassword/${email}`
    return this.http.get(url);
  }

  resetPasswordToken(token:string){
    const url = `${this.baseUrl}/api/token/resetpassword/${token}`
    return this.http.put(url,token);
  }

  getLocalStorageToken(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    return this.RefreshToken();
  }

  RefreshToken():Observable<boolean>{
    const url = `${this.baseUrl}/auth/refresh`
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token') || ''}` )

   this.http.get<TokenRefresh>(url, { headers })
    .subscribe(resp =>  localStorage.setItem('token',resp.token),_ =>localStorage.clear())
    if (!localStorage.getItem('token')) return of(false);
    return of(true)
  }

}
