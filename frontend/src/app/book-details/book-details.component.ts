import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Book } from '../Models/Book';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book!: any;

  constructor(private rest: HttpService, private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getBookDet(params['isbn']);
    })
  }

  getBookDet(isbn: any):void {
    this.rest.getBookDetails(isbn).subscribe((data: any) => {
      this.book = data[0];
      this.book.cover = this.rest.getBookCover(this.book);
    });
  }
}