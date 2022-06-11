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
  cart: any = {};
  constructor(private rest: HttpService) {}

  ngOnInit(): void {
    this.getBooksInCart();
  }

  getBooksInCart(): void {
    this.cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    if (Object.keys(JSON.parse(localStorage.getItem('shoppingCart')!)).length > 0) {
      for (let id in this.cart) {
        this.rest.getBookById(id).subscribe((book: any) => {
          this.booksInCart.push(book[0]);
        });
      }
    }
  }

  removeFromCart(id: string): void {
    this.cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    delete this.cart[id];
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.booksInCart = [];
    this.getBooksInCart();
  }

  addItem(id: string, max:number): void {
    this.cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    if(this.cart[id] + 1 <= max){
      this.cart[id] = this.cart[id] + 1;
      localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

  }

  subtractItem(id: string): void {
    this.cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    if(this.cart[id] - 1 > 0){
      this.cart[id] = this.cart[id] - 1;
      localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

  }

  getTotalPrice(): number {
    let total = 0;
    let finalTotal = 0;
    this.cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    try{
      if (Object.keys(this.cart).length > 0 && this.booksInCart.length > 0) {
        for (let id in this.cart) {
          total += this.cart[id] * this.booksInCart.find((book: { _id: string; }) => book._id === id).price;
          finalTotal = parseFloat(total.toFixed(2));
        }
      }
    }
    catch(e){
      return 0;
    }
    return finalTotal;
  }
}
