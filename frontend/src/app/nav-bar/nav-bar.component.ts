import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { faShop } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  faShop = faShop;
  faMagnifyingGlass = faMagnifyingGlass;
  faCircleUser = faCircleUser;
  faCartShopping = faCartShopping;

  constructor(private router:Router) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.searchBy, form.value.search]);
  }

  isLoggedIn():boolean{
    if (localStorage.getItem('currentUser')){
      return true
    }
    return false
  }

  itemsInCart():number{
    if (localStorage.getItem('shoppingCart')){
      return Object.keys(JSON.parse(localStorage.getItem('shoppingCart')!)).length
    }
    return 0
  }

}
