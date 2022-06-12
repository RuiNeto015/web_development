import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
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
