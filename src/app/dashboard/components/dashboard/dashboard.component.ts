import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Task } from 'src/app/classes/task';
import { Employee } from 'src/app/classes/employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employeeId: any;
  companyId: any;
  // to storing all parent task
  parentTaskData: Task[] = [];
  allParentTaskData = new Map();

  employees: Employee[] = [];

  childTaskData = new Map();

  constructor(private dashboardService: DashboardService
  ) {

    this.employeeId = localStorage.getItem('employeeId');
    this.companyId = localStorage.getItem('companyId');
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

  // for getting child task using parent id
  onClickChild(task: Task) {
    this.dashboardService.getChildTaskByParentId(task.taskId).subscribe(
      (response) => {
        this.childTaskData.set(task.taskId, response);
        console.table(this.childTaskData);

      },
      (error) => {
        console.log("Failed to load child task!");

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

    this.dashboardService.getTasksByStatusAndCreatorAndAssigneeOfCompanyByCompanyIdId(parentId, status, createdBy, assignedTo, companyId).subscribe(
      (response) => {
        this.parentTaskData = response;
        console.log(this.parentTaskData);

      },
      (error) => {
        console.log("Failed to get parent task for status : " + status);

      }
    );
  }

}
