import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { FooterModule } from '../footer/footer.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FooterModule,
    RouterModule,
  ]
})
export class LoginModule { }
