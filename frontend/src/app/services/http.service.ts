import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';
import { delay, Observable, retry, retryWhen, scan } from 'rxjs';

const API_DOMAIN = 'http://localhost:3000/';
const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getBooks(searchBy?: string, search?: string) {
    if (searchBy && search) {
      switch (searchBy) {
        case 'title':
          return this.http.get<Book[]>(API_DOMAIN + 'books/filterByTitle/' + search);
        case 'author':
          return this.http.get<Book[]>(API_DOMAIN + 'books/filterByAuthor/' + search);
        case 'isbn':
          return this.http.get<Book[]>(API_DOMAIN + 'books/searchByISBN/' + search);
      }
    } 
    return this.http.get<Book[]>(API_DOMAIN + 'books/booksList');
  }

  getBooksCover(books: any) {
    books.forEach((book: any) => {
      this.http.get(GOOGLE_API + book.isbn).pipe(this.handleRetry).subscribe((data: any) => {
        book.cover = data.items[0].volumeInfo.imageLinks.thumbnail;
      });
    });
    return books;
  }

  getBookCover(book: any) {
    this.http.get(GOOGLE_API + book.isbn).pipe(this.handleRetry).subscribe((data: any) => {
      book.cover = data.items[0].volumeInfo.imageLinks.thumbnail;
    });
  }

  getBookById(id: string) {
    return this.http.get<Book>(API_DOMAIN + 'books/bookById/' + id);
  }

  getBookDetails(isbn: String) {
    return this.http.get<Book>(API_DOMAIN + 'books/searchByISBN/' + isbn);
  }

  getUserInfo() {
    return this.http.get(API_DOMAIN + 'profile');
  }

  getAgeDiscount(search: string) {
    return this.http.get(API_DOMAIN + 'getAgeDiscount/' + search);
  }

  getPurchaseDiscount(search: number) {
    return this.http.get(API_DOMAIN + 'getPurchaseDiscount/' + search);
  }

  createPurchaseDiscount(percentage: number) {
    return this.http.post(API_DOMAIN + 'createPurchaseDiscount', {percentage});
  }

  private handleRetry<T>(source: Observable<T>): Observable<T> {
    return source.pipe(retryWhen(e => e.pipe(scan((errorCount, error) => {
        if (errorCount >= 3) {
            throw error;
        }
        return errorCount + 1;
    }, 0),
        delay(1000)
    )));
}
}
