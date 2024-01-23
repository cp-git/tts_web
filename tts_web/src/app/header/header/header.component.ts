import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  employeeId: any;
  companyId: any;
  empDataFromSession: any;
  empData: any;
  isAdmin: boolean = false;
  displayCompanyLogo: any;

  constructor(private router: Router) {
    this.displayCompanyLogo = `${environment.companyUrl}/photos`;
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');
    this.empDataFromSession = sessionStorage.getItem('empData');
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
    sessionStorage.removeItem('toggle');
    // Navigate to the '/' route
    this.router.navigate(['/']);
  }
}
