import { Component, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Password } from '../../class/password';
import { EmployeeAndPasswordDTO } from 'src/app/employee/class/employeeandpasswordDTO';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { AuthenticationServiceService } from 'src/app/service/authentication-service.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
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
  selectedUserType: string = 'admin';
  employeeData: EmployeeAndPasswordDTO = new EmployeeAndPasswordDTO();
  employeeIsAdmin: any;
  empData: any;
  loginAs: boolean = false;
  constructor(
    private route: Router,
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private authService: AuthenticationServiceService,
    private dialogueBoxService: DialogueBoxService,

  ) {

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
          this.employeeId = sessionStorage.setItem("employeeId", JSON.stringify(this.userData.employeeId));
          if (this.userData) {
            if (this.userData.forgotPassword) {
              this.route.navigate(['/changePass']);
            } else {

              const employeeData = await this.employeeService.getEmployeeWithPasswordById(this.userData.employeeId).toPromise();
              if (employeeData) {
                sessionStorage.setItem('companyId', employeeData.companyId.toString())
                sessionStorage.setItem('empData', JSON.stringify(employeeData));

              }
              this.employeeId = sessionStorage.getItem('employeeId');
              this.employeeIsAdmin = sessionStorage.getItem('empData');

              // Set employeeId in sessionStorage
              sessionStorage.setItem('employeeId', this.userData.employeeId.toString());
              //await this.getEmployeeWithPassword(this.userData.employeeId);
              this.empData = JSON.parse(this.employeeIsAdmin);
              // alert(JSON.stringify(this.empData));

              if (this.userData.username == "superadmin") {
                this.route.navigate(['/company']);
              } else
                if (this.empData.admin == true) {
                  if (this.selectedUserType == "admin") {
                    $('#exampleModal').modal('show');
                  }
                } else {
                  this.route.navigate(['/dashboard']);
                }
            }
          } else {
            // Display a dialog box with the message "Invalid Details" in case of login failure.
            this.dialogueBoxService.open('Seems that either username or password is Incorrect.', 'warning');
          }
        },
        (error) => {
          console.log('Error occurred:', error);
          // Display a dialog box with the message "Invalid Details" for login failure due to an error.
          this.dialogueBoxService.open('Seems that either username or password is Incorrect.', 'warning');
        }
      );
  }


  redirectToForgot() {
    this.route.navigate(['/forgot']);
  }



}