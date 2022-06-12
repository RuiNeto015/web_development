import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.css']
})
export class UserPurchasesComponent implements OnInit {

  user: any;
  purchases: any = [];

  constructor(private rest: HttpService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(){
    this.rest.getUserInfo().subscribe((data: {}) => {
      this.user = data;
      this.getUserPurchases();
    });
  }

  getUserPurchases(){
    this.rest.getUserPurchases(this.user.nif).subscribe((data: {}) => {
      this.purchases = data;
    })
  }
}
