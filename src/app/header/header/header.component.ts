import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  employeeId: any;
  constructor(private router: Router) {
    this.employeeId = sessionStorage.getItem("employeeId");
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
