import { Component, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Password } from '../../class/password';
import { EmployeeAndPasswordDTO } from 'src/app/employee/class/employeeandpasswordDTO';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { AuthenticationServiceService } from 'src/app/service/authentication-service.service';
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
  errorMessage: string = '';

  passwordData!: Password;
  userData!: Password;

  forgotData = { username: '', email: '' };
  showForgotPopup = false;

  employeeId: any;

  employeeData: EmployeeAndPasswordDTO = new EmployeeAndPasswordDTO();

  constructor(
    private route: Router,
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private authService: AuthenticationServiceService

  ) {
    this.employeeId = sessionStorage.getItem('employeeId');
    this.passwordData = new Password();
    this.userData = new Password();
  }
  ngOnInit(): void {

  }

  login(passwordData: any) {
    // alert(passwordData + this.passwordData.username);
    this.loginService.getPasswordByUsernameAndPassword(this.passwordData.username, this.passwordData.password)
      .subscribe(
        async (response) => {
          this.authService.setSession(this.passwordData);
          // Check the response from the API
          this.userData = response;
          // alert(this.userData);
          sessionStorage.setItem('employeeId', this.userData.employeeId.toString());
          await this.getEmployeeWithPassword(this.userData.employeeId);

          if (this.userData) {
            if (this.userData.username === "admin") {

              this.route.navigate(['/company']);
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

  // Method to get an employee with their password by ID
  private async getEmployeeWithPassword(employeeId: number) {
    // alert(this.empid);
    // console.log(this.empid);

    const employeeData = await this.employeeService.getEmployeeWithPasswordById(employeeId).toPromise();
    if (employeeData) {
      sessionStorage.setItem('companyId', employeeData.companyId.toString())
      sessionStorage.setItem('empData', JSON.stringify(employeeData));

    }

    // this.employeeService.getEmployeeWithPasswordById(this.empid).subscribe(
    //   (response: any) => {
    //     this.employeeData = response; // Assign the response to 'employeeData' property
    //     // sessionStorage.setItem('countryId', this.employeeData.countryId.toString());
    //     sessionStorage.setItem('companyId', this.employeeData.companyId.toString())
    //     //alert(JSON.stringify(this.employeeData));
    //   },
    //   (error: any) => {
    //     console.error('Failed to get employee with password:', error); // Log error message and response
    //   }
    // );
  }

  redirectToForgot() {
    this.route.navigate(['/forgot']);
  }

}