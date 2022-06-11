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
  discount: any;
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

  getAgeDiscount(search: string){
    this.rest.getAgeDiscount(search).subscribe((data: {}) => {
      this.discount = data;
      if(!this.discount.uses){
        this.discount.uses = "Ilimitado";
      }
      this.openPopup();
    });
  }

}


