// Import necessary Angular modules and classes
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
import { Task2 } from 'src/app/classes/task2';

// Define the component metadata, including the selector, template, and styles
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Declare class properties
  employee!: Employee;
  company!: Company;
  employeeId: any;
  companyId: any;
  // to store all parent tasks
  parentTaskData: Task[] = [];
  allParentTaskData = new Map();
  displayCompanyLogo: any;
  displayEmployeeLogo: any;
  employees: Employee[] = [];
  allStatus: Status[] = [];
  childTaskData = new Map();
  loggedInUserData: any;
  // Define selected statuses as an array with a default value
  selectedStatuses: string[] = ['ALL']; // Default value
  filteredStatuses: Status[] = [];

  // Constructor - executed when an instance of the component is created
  constructor(
    private dashboardService: DashboardService,
    private taskService: TaskService,
    private statusService: StatusService,
    private router: Router
  ) {
    // Initialize properties and retrieve data from sessionStorage
    this.displayCompanyLogo = `${environment.companyUrl}/photos`;
    this.displayEmployeeLogo = `${environment.employeeUrl}/employee/photos`;
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');
    this.loggedInUserData = sessionStorage.getItem('empData');

    this.loggedInUserData = JSON.parse(this.loggedInUserData); // Parse JSON data
    //console.log(this.loggedInUserData);
    this.getCompanyById(this.companyId); // Fetch company data
  }

  //ngOnInit is executed after the constructor
  ngOnInit(): void {

    //console.log(this.allStatus);

    this.initialization(); // Call the initialization method

  }

  // Initialization method
  private initialization() {
    // Fetch all employees
    this.getAllEmployees();

    // Fetch all parent tasks with specified filters
    const data = {
      statuses: this.allStatus.map(status => status.statusCode), // Set all statuses by default
      createdBy: 0,
      assignedTo: 0,
      companyId: this.companyId,
      parentId: 0,
    };

    this.getParentTask(data); // Fetch parent tasks
    // this.getAllStatus(); // Fetch all statuses
    this.getStatusesByCompanyId();
  }




  // Fetch all employees
  private getAllEmployees() {
    this.dashboardService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response;
        //console.log(this.employees);
      },
      (error) => {
        //console.log('Failed to get all employees');
      }
    );
  }


  // 
  // getting all task based on created by, assigned to and status
  // Fetch parent tasks based on specified filters
  // getParentTask(data: any) {
  //   //console.log(data);
  //   const createdBy = data.createdBy;
  //   const assignedTo = data.assignedTo;
  //   const companyId = data.companyId;
  //   const parentId = data.parentId;

  //   // Check if statuses array is empty
  //   const statuses = data.statuses.length === 0
  //     ? ["ALL"] // If empty, use "ALL" as the status
  //     : data.statuses.map((status: any) => status.itemName); // Extract itemName values

  //   this.taskService
  //     .getTasksByStatusAndCreatorAndAssigneeOfCompanyByCompanyIdId(
  //       parentId,
  //       statuses,
  //       createdBy,
  //       assignedTo,
  //       companyId
  //     )
  //     .subscribe(
  //       (response) => {
  //         this.parentTaskData = response;
  //         //console.log('Parent Task Data:', this.parentTaskData);
  //       },
  //       (error) => {
  //         //console.log('Failed to get parent tasks for statuses:', statuses);
  //       }
  //     );
  // }

  parentAndAllTask!: Task2;
  // get all task by created by me or assigned to me
  getParentTask(data: any) {
    this.taskService.getTaskCreatedByMeOrAssignedToMe(this.employeeId).subscribe(
      (response) => {
        this.parentAndAllTask = response;
      }
    );
  }

  // Fetch all statuses
  private getAllStatus() {
    this.statusService.getAllStatus().subscribe(
      (response) => {
        // Store all statuses
        this.allStatus = response;
        //console.log(this.allStatus);
      },
      (error) => {
        //console.log('Failed to get all statuses');
      }
    );
  }

  // Fetch company data by ID
  getCompanyById(companyId: number): void {
    this.dashboardService.getCompanyById(companyId).subscribe(
      (data) => {
        this.company = data; // Store the retrieved company data
        //console.log('Retrieved company:', this.company);
      },
      (error) => {
        console.error('Error retrieving company:', error);
      }
    );
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
    sessionStorage.removeItem('selectedStatuses');

    this.router.navigate(['/']); // Navigate to the root URL
  }

  onChangeStatusFilter(data: any) {
    //console.log(data);
    this.filteredStatuses = data;
    //console.log(this.filteredStatuses);

  }

  // Fetch all statuses by company Id
  private getStatusesByCompanyId() {
    this.statusService.getStatusesByCompanyId(this.companyId).subscribe(
      (response) => {
        // Store all statuses
        this.allStatus = response;
        //console.log(this.allStatus);
      },
      (error) => {
        //console.log('Failed to get all statuses by company');
      }
    );
  }
}
