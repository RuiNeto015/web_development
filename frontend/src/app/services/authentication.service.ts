import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_DOMAIN = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: any;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(API_DOMAIN+'login', { email, password });
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  register(name: string, email: string, gender: string, 
      birth_date: Date, address: string, phoneNumber: number, nif: number, password: string): Observable<any>{
        console.log("Register",API_DOMAIN+'register');
      return this.http.post<any>(API_DOMAIN+'register', { name, email, gender, birth_date, address, phoneNumber, nif, password });    

  }
}
