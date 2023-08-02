import { Component, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;

  clicked:boolean = false;

  username: string = '';
  password: string = '';
  constructor(
    private route: Router,
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {
  }

  login() {
    this.isLoggedIn = this.loginService.login(this.username,this.password);
    this.clicked=true;
    if (this.isLoggedIn) {
      this.route.navigate(['/dashboard']);
    } else {
      this.route.navigate(['/login']);

    }
  }
}