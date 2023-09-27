import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  title = 'tts_web';
  currentRoute: any;
  employeeId: any;

  constructor(private route: Router) {
    this.employeeId = sessionStorage.getItem("employeeId");
  }

  ngOnInit(): void {
    if (this.employeeId <= 0) {
      this.route.navigate([''])
    }
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
  changeButtonColor(button: HTMLButtonElement) {
    button.style.backgroundColor = 'red'; // Change the color to any desired color
  }

}
