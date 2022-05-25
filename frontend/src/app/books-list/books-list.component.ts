import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: any = [];
  constructor(private rest: HttpService) {}

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.rest.getBooks().subscribe((data:{}) => {
      this.books = data;
      this.books = this.rest.getBooksCover(this.books);
    });
  }
}
