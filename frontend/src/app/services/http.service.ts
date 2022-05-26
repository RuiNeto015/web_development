import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';

const API_DOMAIN = 'http://localhost:3000/';
const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<Book[]>(API_DOMAIN + 'books/booksList');
  }

  getBooksCover(books: any) {
    books.forEach((book: any) => {
      this.http.get(GOOGLE_API + book.isbn).subscribe((data: any) => {
        book.cover = data.items[0].volumeInfo.imageLinks.thumbnail;
      });
    });
    return books;
  }
}
