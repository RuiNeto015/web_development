import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: any;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>('http://localhost:3000/login', { email, password});
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  register(email: string, password: string): Observable<any>{
    return this.http.post<any>('http://localhost:3000/register', { email, password });
  }
}
