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

}


