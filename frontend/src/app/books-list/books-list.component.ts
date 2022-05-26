import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: any = [];
  constructor(private rest: HttpService, private router:Router) {}

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks():void {
    this.rest.getBooks().subscribe((data:{}) => {
      this.books = data;
      this.books = this.rest.getBooksCover(this.books);
    });
  }

  getBookDetails(isbn:String):void{
    this.router.navigate(['bookDetails', isbn]);
  }
}
