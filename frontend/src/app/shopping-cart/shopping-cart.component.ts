import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  faTrash = faTrash;
  booksInCart: any = [];
  constructor(private rest: HttpService) {}

  ngOnInit(): void {
    this.getBooksInCart();
  }

  getBooksInCart(): void {
    var cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    if (cart.length > 0) {
      for (let id of cart) {
        this.rest.getBookById(id).subscribe((book: any) => {
          this.booksInCart.push(book[0]);
        });
      }
    }
  }

  removeFromCart(id: string): void {
    var cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    cart = cart.filter((item: string) => item !== id);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    this.booksInCart = [];
    this.getBooksInCart();
  }
}
