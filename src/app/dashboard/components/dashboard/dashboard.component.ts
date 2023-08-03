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

  statusArray = new Map();

  // to storing all parent task
  parentTaskData: Task[] = [];
  allParentTaskData = new Map();

  employees: Employee[] = [];

  childTaskData = new Map();

  constructor(private dashboardService: DashboardService
  ) {
    this.assignStatus();
  }

  ngOnInit(): void {
    this.initialization();
  }

  private assignStatus() {
    this.statusArray.set('CREATED', 'CREATED');
    this.statusArray.set('INPROGRESS', 'INPROGRESS');
    this.statusArray.set('DONE', 'DONE');

  }

  // calling default method when load component
  private initialization() {

    // for getting all employees
    this.getAllEmployees();

    // for getting all parent task
    this.getAllParentTask();
  }

  private getAllParentTask() {

    // getting all parent task for status array
    this.statusArray.forEach((value, key) => {
      this.getAllParentTaskByStatus(value);
    });
  }

  // for getting all parent task using status 
  getAllParentTaskByStatus(status: string) {
    this.dashboardService.getAllParentTaskByStatus(status).subscribe(
      (data) => {

        // getting and adding data in map
        this.allParentTaskData.set(status, data);
        console.table(this.allParentTaskData);

      },
      (error) => {
        console.log("Failed to get data!");
      }
    );
  }

  // for gettign all employees
  private getAllEmployees() {
    this.dashboardService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response;
      },
      (error) => {
        console.log("Failed to get all employees");
      }
    );
  }

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

  onClickCreated(event: any) {
    this.parentTaskData = this.allParentTaskData.get('CREATED')
    console.log(this.parentTaskData);

  }

  onClickInProgress(event: any) {
    this.parentTaskData = this.allParentTaskData.get('INPROGRESS')
    console.log(this.parentTaskData);


  }

  onClickDone(event: any) {
    this.parentTaskData = this.allParentTaskData.get('DONE')
    console.log(this.parentTaskData);

  }


}
