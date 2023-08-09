import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../class/task';
import { Status } from 'src/app/classes/status';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { Employee } from 'src/app/classes/employee';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {


  @Input() parentTaskData: Task[] = [];
  @Input() employees: Employee[] = [];
  @Input() allStatus: Status[] = [];

  employeeId: any;
  companyId: any;
  parentTask: Task = {} as Task;
  childData: Task[] = [];
  emptyTask: Task = {} as Task;

  // allStatus: Status[] = [];  // to store all status 
  showChildTable: Map<number, boolean> = new Map();   // for opening/ closing child table for task

  constructor(
    private dashboardService: DashboardService,
    private taskService: TaskService
  ) {

    this.employeeId = localStorage.getItem("employeeId");
    this.companyId = localStorage.getItem("companyId");
  }

  ngOnInit(): void {
    // this.getAllStatus();
  }

  // for opening/ closing child table for task
  toggleChildTable(task: Task): void {

    // updating showChildTable variable with toggled value
    this.showChildTable.set(task.taskId, !this.showChildTable.get(task.taskId));

    // calling function to get child task
    this.onClickChild(task);
  }

  // for getting child task using parent id
  private onClickChild(task: Task) {

    // if (this.parentTaskData[this.parentTaskData.indexOf(task)].childTask) {
    //   console.log("exist");

    // } else {
    console.log("not exist");
    // calling function to get child task using parent id
    this.taskService.getChildTaskByParentId(task.taskId).subscribe(
      (response) => {
        this.childData = response;

        // setting child data to parent task
        this.parentTaskData[this.parentTaskData.indexOf(task)].childTask = this.childData;

      },
      (error) => {
        console.log("Failed to load child task!");
      }
    );
    // }

  }

  // calls when we change status
  onChangeStatus(task: Task) {
    const status = this.allStatus.find(status => task.taskStatus == status.statusId);
    console.log(status);
    if (status) {
      switch (status.statusCode.toLowerCase()) {
        case 'create':
          break;

        case 'inprogress':
          break;

        case 'done':
          // when status is done then setting actual end date to current date
          // task.taskActualEndDate = new Date();
          break;

      }
    }

  }

  onClickCreateTask(task: Task) {
    console.log(task);
    
    this.parentTask = Object.assign({}, task);
    console.log(this.parentTask);
    
    this.emptyTask.companyId = this.companyId;
    this.emptyTask.taskParent = this.parentTask.taskId;
    this.emptyTask.taskCreatedBy = this.employeeId;
    this.emptyTask.taskAssignedTo = this.employeeId;
    
  }


  // for getting all status
  private getAllStatus() {
    this.dashboardService.getAllStatus().subscribe(
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
}
