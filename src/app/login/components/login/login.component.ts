import { Component, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Password } from '../../class/password';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //  isLoggedIn: boolean = false;

  // clicked: boolean = false;

  passwordData!: Password;
  userData!: Password;
  // username: string = '';
  // password: string = '';


  isLoggedIn = false;
  clicked = false;

  forgotData = { username: '', email: '' };
  showForgotPopup = false;

  constructor(
    private route: Router,
    private loginService: LoginService,
    private http: HttpClient

  ) {
    this.passwordData = new Password();
    this.userData = new Password();
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

  // login() {
  //   this.loginService.login(this.username, this.password).subscribe(
  //     (isLoggedIn: boolean) => {
  //       alert(isLoggedIn);
  //       if (isLoggedIn) {
  //         alert("pass");
  //         this.route.navigate(['/dashboard']);

  //       } else {
  //         // Show error message or handle login failure
  //         // For now, just redirect back to the login page
  //         alert("fail");
  //         this.route.navigate(['/login']);

  //       }
  //     },
  //     (error) => {
  //       // Handle error cases, e.g., API not reachable
  //       console.error('Error while logging in:', error);
  //       // For now, just redirect back to the login page
  //       this.route.navigate(['/login']);
  //     }
  //   );
  // }

  // loginUser(username: any, password: any) {
  //   this.loginService.getPasswordByUsernameAndPassword(username, password).subscribe(
  //     (response) => {
  //       alert(response);
  //       if (response.success) {
  //         alert("pass");
  //       }
  //     },
  //     (error) => {
  //       console.error('Failed to get :', error); // Handle any errors that occur during the request
  //     }
  //   );
  // }


  logindirect(passwordData: any) {
    // alert(passwordData + this.passwordData.username);
    this.loginService.getPasswordByUsernameAndPassword(this.passwordData.username, this.passwordData.password)
      .subscribe(
        (response) => {
          // Check the response from the API
          this.userData = response;
          if (this.userData) {
            if (this.userData.username === "admin") {
              this.route.navigate(['/adminDash']);
            } else {
              this.route.navigate(['/dashboard']);
            }
          } else {
            alert("Invalid Details");
          }
        },
        (error) => {
          console.log('Error occurred:', error);
        }
      );
  }



  openForgotPopup() {
    this.showForgotPopup = true;
  }

  closeForgotPopup() {
    this.showForgotPopup = false;
  }

  handleForgotPassword() {
    // Implement your "Forgot" password logic here
    // For simplicity, we'll just display the username and email in the console
    console.log('Username: ', this.forgotData.username);
    console.log('Email: ', this.forgotData.email);

    // Close the popup after handling the "Forgot" password
    this.closeForgotPopup();
  }

}