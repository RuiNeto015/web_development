import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  faTrash = faTrash;
  booksInCart: any = [];
  cart: any = {};
  paymentHanlder: any = null;

  constructor(private rest: HttpService) { }

  ngOnInit(): void {
    this.getBooksInCart();
    this.invokeStripe();
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

  makePayment(){
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L9VXTK0Y6qjeiGr3Vm4KzSgiWMl7JIEIryy8LdavdTEwo7WdZK8hkvSBWDPYoiVpd3yN2s8m6bJ9B8Jk3Cz7MJW00Ty7KBA37',
      locale: 'auto',
      token: function(stripeToken: any){
        console.log(stripeToken.card);
        alert('Stripe token generated!');
      }
    });

    paymentHandler.open({
      name: 'Teste',
      description: 'Products added',
      amount: this.getTotalPrice() * 100
    })
  }

  invokeStripe(){
    if(!window.document.getElementById('stripe-script')){
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(script);
    }
  }
}
