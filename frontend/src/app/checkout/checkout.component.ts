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
  user: any;
  stripeToken: any;

  constructor(private rest: HttpService) { }

  ngOnInit(): void {
    this.getUserInformation();
    this.getBooksInCart();
    this.invokeStripe();
  }

  getUserInformation(): void{
    this.rest.getUserInfo().subscribe((data: {}) => {
      this.user = data;
      console.log(this.user.nif)
    });
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
      token: (stripeToken: any) => {
        this.stripeToken = stripeToken.card;
        alert('Pagamento efetuado com sucesso. Boa leitura!');
        this.createPurchase();
      }
    });

    paymentHandler.open({
      name: 'Efetua Pagamento',
      description: 'Preencha os seguintes campos',
      amount: this.getTotalPrice() * 100
    })  
  }

  createPurchase(){
      const now = new Date();
      const iisbn: any = [];
      const ttitle: any = [];
      const ccondition: any = [];
      const qquantity: any = [];
      const pprice: any = [];

      for(let i = 0; i < this.booksInCart.length; i ++){
        iisbn.push(this.booksInCart[i].isbn)
      }
      for(let i = 0; i < this.booksInCart.length; i ++){
        ttitle.push(this.booksInCart[i].title)
      }
      for(let i = 0; i < this.booksInCart.length; i ++){
        ccondition.push(this.booksInCart[i].condition)
      }
      for(let i = 0; i < this.booksInCart.length; i ++){
        qquantity.push(this.booksInCart[i].quantity)
      }
      for(let i = 0; i < this.booksInCart.length; i ++){
        pprice.push(this.booksInCart[i].price)
      }

      this.rest.createPurchase(this.user.nif, now, this.user.name, this.user.email, this.user.phoneNumber,
        this.user.address, iisbn, ttitle,ccondition,
        qquantity, pprice, this.stripeToken).subscribe((response: any)=>{
          console.log("Response: ", response);
        });
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
