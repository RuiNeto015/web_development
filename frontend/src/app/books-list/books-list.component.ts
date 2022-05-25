import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  constructor(private books: HttpService) {}

  ngOnInit(): void {
    this.books.getBooks().subscribe((res) => {
      console.log(res);
    });
  }
}
