import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

const API_DOMAIN = 'http://localhost:3000/';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name!:string;
  email!:string;
  gender!:string;
  birth_date!:Date;
  address!:string;
  phoneNumber!:number;
  nif!:number;
  password!:string;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  register():void {
    this.authService.register(this.name, this.email, this.gender, this.birth_date, 
      this.address, this.phoneNumber, this.nif, this.password)
  }
}