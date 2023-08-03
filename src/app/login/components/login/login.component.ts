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

  clicked: boolean = false;

  username: string = '';
  password: string = '';
  constructor(
    private route: Router,
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {
  }

  // login() {
  //   this.isLoggedIn = this.loginService.login(this.username,this.password);
  //   this.clicked=true;
  //   if (this.isLoggedIn) {
  //     this.route.navigate(['/dashboard']);
  //   } else {
  //     this.route.navigate(['/login']);

  //   }
  // }

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          alert("pass");
          this.route.navigate(['/dashboard']);

        } else {
          // Show error message or handle login failure
          // For now, just redirect back to the login page
          alert("fail");
          this.route.navigate(['/login']);

        }
      },
      (error) => {
        // Handle error cases, e.g., API not reachable
        console.error('Error while logging in:', error);
        // For now, just redirect back to the login page
        this.route.navigate(['/login']);
      }
    );
  }
}