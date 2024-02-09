import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { Password } from '../../class/password';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {

  newPassword: string = '';
  confirmPassword: string = '';
  employeeId: number = 0;
  password: any;
  empDataFromSession: any;
  empData: any;
  isSubmitDisabled: boolean = true;
  constructor(
    private employeeService: EmployeeService,
    private route: Router,
    private dialogueBoxService: DialogueBoxService
  ) {
    this.password = new Password();

    this.empDataFromSession = sessionStorage.getItem('empData')
    this.empData = JSON.parse(this.empDataFromSession);
    const employeeData = sessionStorage.getItem("employeeId");
    if (employeeData) {
      this.employeeId = parseInt(employeeData);
    }
  }

  changePassword() {
    this.password.employeeId = this.employeeId;
    this.password.password = this.confirmPassword;

    // Add your logic here to handle password change
    if (this.newPassword === this.confirmPassword) {
      this.employeeService.updatePasswordByEmployeeId(this.employeeId, this.password).subscribe(
        (response) => {


          this.dialogueBoxService.open('Password has been updated successfully', 'information');
          this.route.navigate(['/login']);
        }, (error) => {
          this.dialogueBoxService.open('Passwords do not match', 'information');

        }
      )

    } else {
      this.dialogueBoxService.open('Passwords do not match', 'information');

    }
  }
  checkPasswordLength() {
    this.isSubmitDisabled = !(this.newPassword.length >= 8 && this.confirmPassword.length >= 8);
  }

  togglePassword(inputId: string) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
      inputElement.setAttribute('type', type);
    }
  }




}
