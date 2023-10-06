import { Component, OnInit } from '@angular/core';
import { ReasonService } from '../../services/reason.service';
import { Employee } from 'src/app/employee/class/employee';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Company } from 'src/app/company/class/company';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { environment } from 'src/environments/environment.dev';
@Component({
  selector: 'app-change-history',
  templateUrl: './change-history.component.html',
  styleUrls: ['./change-history.component.css']
})
export class ChangeHistoryComponent implements OnInit {
  reasons: any[] = []; // Array to hold reasons related to a task
  employees!: Employee[]; // Array to hold employee data
  statusList: any[] = []; // Array to hold status data
  taskId: any;
  // Declare class properties
  employee!: Employee;
  company!: Company;
  employeeId: any;
  companyId: any;


  displayCompanyLogo: any;
  displayEmployeeLogo: any;



  loggedInUserData: any;
  // Define selected statuses as an array with a default value
  selectedStatuses: string[] = ['ALL']; // Default value


  constructor(private dashboardService: DashboardService, private router: Router, private reasonService: ReasonService, private employeeService: EmployeeService, private location: Location,
    private _activatedRoute: ActivatedRoute
  ) {  // Initialize properties and retrieve data from sessionStorage
    this.displayCompanyLogo = `${environment.companyUrl}/photos`;
    this.displayEmployeeLogo = `${environment.employeeUrl}/employee/photos`;
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');
    this.loggedInUserData = sessionStorage.getItem('empData');

    this.loggedInUserData = JSON.parse(this.loggedInUserData); // Parse JSON data
    console.log(this.loggedInUserData);
    // this.getCompanyById(this.companyId); // Fetch company data
  }

  ngOnInit(): void {
    this.taskId = this._activatedRoute.snapshot.paramMap.get('id');
    this.getReasonsByTaskId(this.taskId); // Fetch reasons for the task
    this.fetchEmployees(); // Fetch employee data
    this.fetchStatusList(); // Fetch status data
  }

  // Method to fetch reasons related to a specific task by its ID
  getReasonsByTaskId(taskId: number): void {
    this.reasonService.getReasonsByTaskId(taskId).subscribe(
      (data: any) => {
        this.reasons = data; // Store the retrieved reasons in the reasons array
      },
      (error: any) => {
        alert('Error fetching reasons:');
      }
    );
  }

  // Method to fetch employee data
  fetchEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data; // Store the retrieved employee data in the employees array
      },
      (error: any) => {
        alert('Error fetching employees:');
      }
    );
  }

  // Method to fetch status data
  fetchStatusList(): void {
    this.reasonService.getAllStatus().subscribe(
      (data: any[]) => {
        this.statusList = data; // Store the retrieved status data in the statusList array
      },
      (error: any) => {
        alert('Error fetching status list:');
      }
    );
  }

  // Method to get the status name by its ID
  getStatusNameById(statusId: number): string {
    // Find the status in the statusList array based on the provided statusId
    const status = this.statusList.find((s) => s.statusId === statusId);

    // Return the status code if found, otherwise an empty string
    return status ? status.statusCode : '';
  }


  // Method to get the name of an employee by their ID
  getEmployeeNameById(employeeId: number): string {
    // Find the employee in the employees array based on the provided employeeId
    const employee = this.employees.find((e) => e.employeeId === employeeId);

    // Return the full name (first name + last name) if found, otherwise an empty string
    return employee ? `${employee.firstName} ${employee.lastName}` : '';
  }


  // Method to perform actions to close the table
  close() {
    this.location.back();
  }

  // Logout method
  logout() {

    // Remove items from sessionStorage
    sessionStorage.removeItem('selectedAssignedTo');
    sessionStorage.removeItem('selectedCreatedBy');
    sessionStorage.removeItem('selectedTask');
    localStorage.removeItem('selectedDateFormat');
    sessionStorage.removeItem('employeeId');
    sessionStorage.removeItem('companyId');
    sessionStorage.removeItem('empData');

    this.router.navigate(['/']); // Navigate to the root URL
  }
}
