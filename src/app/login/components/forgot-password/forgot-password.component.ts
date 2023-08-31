import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  username: any;
  isLoading: boolean = false;
  constructor(private loginService: LoginService, private dialogueBoxService: DialogueBoxService, private route: Router) {
  }
  forgotPassword() {
    this.isLoading = true;
    this.loginService.forgotPasswordByUsername(this.username).subscribe(
      (response) => {
        //alert("Password is created please check mail");
        this.dialogueBoxService.open('Password has been sent to your registered mail', 'information');
        this.route.navigate(['/login']);
      },
      (error) => {
        // alert("Password is failed to created ");
        this.dialogueBoxService.open('Invalid credentials', 'warning');
      }
    ).add(() => {
      this.isLoading = false;
    });
  }
  redirectToLogin() {
    // Use the router to navigate to the login page
    this.route.navigate(['/login']); // Replace '/login' with the actual URL of your login page
  }
}
