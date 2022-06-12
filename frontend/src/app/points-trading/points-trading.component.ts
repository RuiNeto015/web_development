import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-points-trading',
  templateUrl: './points-trading.component.html',
  styleUrls: ['./points-trading.component.css']
})
export class PointsTradingComponent implements OnInit {
  user: any;
  displayModal = "none";
  displayAlert = "none";
  discount: any;
  errorMessage: any;
  constructor(private rest: HttpService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(){
    this.rest.getUserInfo().subscribe((data: {}) => {
      this.user = data;
    });
  }

  openPopup() {
    this.displayModal = "block";
  }
  
  closePopup() {
    this.displayModal = "none";
  }

  closeAlert(){
    this.displayAlert = "none";
  }

  getAgeDiscount(search: string){
    this.rest.getAgeDiscount(search).subscribe((data: {}) => {
      this.discount = data;
      if(!this.discount.uses){
        this.discount.uses = "Ilimitado";
      }
      this.openPopup();
    });
  }

  getPurchaseDiscount(search: number){
    this.rest.getPurchaseDiscount(search).subscribe((data: {}) => {
      this.discount = data;
      if(!this.discount){
        this.createPurchaseDiscount(search);
      }
      this.openPopup();
    });
  }
  
  createPurchaseDiscount(percentage: number){
    this.rest.createPurchaseDiscount(percentage).subscribe((data: {}) => {
      this.discount = data;
      this.openPopup();
    }, (error) => {
      this.errorMessage = error.error;
      this.displayAlert = "block";
    });
  }

  getValueDiscount(value: number){
    this.rest.getValueDiscount(value).subscribe((data: {}) => {
      this.discount = data;
      if(!this.discount || this.discount.uses == 0){
        this.createValueDiscount(value);
      }
      this.openPopup();
    });
  }

  createValueDiscount(value: number){
    this.rest.createValueDiscount(value).subscribe((data: {}) => {
      this.discount = data;
      this.openPopup();
    }, (error) => {
      this.errorMessage = error.error;
      this.displayAlert = "block";
    });
  }
}


