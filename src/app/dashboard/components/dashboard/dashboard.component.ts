import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Task } from 'src/app/task/class/task';
import { Employee } from 'src/app/classes/employee';
import { TaskService } from 'src/app/task/services/task.service';
import { Status } from 'src/app/status/class/status';
import { Company } from 'src/app/company/class/company';
import { StatusService } from 'src/app/status/services/status.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employee!: Employee;
  company!: Company;
  employeeId: any;
  companyId: any;
  // to storing all parent task
  parentTaskData: Task[] = [];
  allParentTaskData = new Map();
  displayCompanyLogo: any;
  displayEmployeeLogo: any;
  employees: Employee[] = [];
  allStatus: Status[] = [];
  childTaskData = new Map();
  loggedInUserData: any;

  constructor(
    private dashboardService: DashboardService,
    private taskService: TaskService,
    private statusService: StatusService,
    private router: Router
  ) {
    this.displayCompanyLogo = `${environment.companyUrl}/photos`;
    this.displayEmployeeLogo = `${environment.employeeUrl}/employee/photos`
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');
    this.loggedInUserData = sessionStorage.getItem('empData');

    this.loggedInUserData = JSON.parse(this.loggedInUserData);
    console.log(this.loggedInUserData);

    this.getCompanyById(this.companyId);
  }

  ngOnInit(): void {
    this.initialization();

  }


  // calling default method when load component
  private initialization() {

    // for getting all employees
    this.getAllEmployees();

    // for getting all parent task
    const data = {
      status: 'ALL',
      createdBy: 0,
      assignedTo: 0,
      companyId: this.companyId,
      parentId: 0
    };
    this.getParentTask(data);
    this.getAllStatus();
  }

  // for gettign all employees
  private getAllEmployees() {
    this.dashboardService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response;
        console.log(this.employees);

      },
      (error) => {
        console.log("Failed to get all employees");
      }
    );
  }

  // for fetching task using status, createdby, assigned to, companyId and parent Id
  getParentTask(data: any) {
    console.log(data);
    const status = data.status;
    const createdBy = data.createdBy;
    const assignedTo = data.assignedTo;
    const companyId = data.companyId;
    const parentId = data.parentId;

    this.taskService.getTasksByStatusAndCreatorAndAssigneeOfCompanyByCompanyIdId(parentId, status, createdBy, assignedTo, companyId).subscribe(
      (response) => {
        this.parentTaskData = response;
        console.log(this.parentTaskData);

      },
      (error) => {
        console.log("Failed to get parent task for status : " + status);

      }
    );
  }

  // for getting all status
  private getAllStatus() {
    this.statusService.getAllStatus().subscribe(
      (response) => {

        // stroign all status
        this.allStatus = response;
        console.log(this.allStatus);

      },
      (error) => {
        console.log("Failed to get all status");
      }
    );
  }

  // Method to fetch the company by ID
  getCompanyById(companyId: number): void {
    this.dashboardService.getCompanyById(companyId).subscribe(
      (data) => {
        this.company = data; // Store the retrieved company data
        console.log('Retrieved company:', this.company);
      },
      (error) => {
        console.error('Error retrieving company:', error);
      }
    );
  }
  logout() {
    // Clear session storage data
    sessionStorage.removeItem('employeeId');
    sessionStorage.removeItem('companyId');
    sessionStorage.removeItem('empData');

    this.router.navigate(['/'])
  }
}
