import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  title = 'tts_web';

  constructor(private route: Router) {

  }

  RedirectToCompany() {
    this.route.navigate(['company'])
  }

  RedirectToCountry() {
    this.route.navigate(['country'])
  }

  RedirectToEmployee() {
    this.route.navigate(['employee'])
  }
}
