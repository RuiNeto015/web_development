import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login():void {
    this.authService.login(this.email, this.password).subscribe((user:any) => {
      if(user && user.token){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      }
    });
  }

}
