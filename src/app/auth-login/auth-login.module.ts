import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { FormsModule } from '@angular/forms';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AuthLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FooterModule,
    RouterModule,
  ]
})
export class AuthLoginModule { }
