import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: any = [];
  title?: string;

  constructor(
    private rest: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['search-by'] && params['book-search']) {
        this.title = 'Resultados da pesquisa \"'+params['book-search']+'\"';
        this.getBooks(params['search-by'], params['book-search']);
      } else {
        this.title = 'Livros Recentemente Adicionados';
        this.getBooks();
      }
    });
  }

  getBooks(searchBy?: string, search?: string): void {
    this.rest.getBooks(searchBy, search).subscribe((data: {}) => {
      this.books = data;
      this.books = this.rest.getBooksCover(this.books);
    });
  }

  getBookDetails(isbn: String): void {
    this.router.navigate(['bookDetails', isbn]);
  }
}
