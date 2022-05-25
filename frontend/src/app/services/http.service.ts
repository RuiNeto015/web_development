import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_DOMAIN:String = "http://localhost:3000/"
  constructor(private http:HttpClient) { }

  getBooks(){
    return this.http.get(this.API_DOMAIN+'books/booksList');
  }
}
