import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  employeeId: any;
  empDataFromSession: any;
  empData: any;
  isAdmin: boolean = false;

  constructor(private router: Router) {
    this.employeeId = sessionStorage.getItem("employeeId");
    this.empDataFromSession = sessionStorage.getItem('empData')
    this.empData = JSON.parse(this.empDataFromSession);
  }

  ngOnInit() {
    this.isAdmin = this.empData.admin;
  }

  logout() {



    // Clear session storage data
    sessionStorage.removeItem('employeeId');
    sessionStorage.removeItem('companyId');
    sessionStorage.removeItem('empData');

    // Navigate to the '/' route
    this.router.navigate(['/']);
  }
}
