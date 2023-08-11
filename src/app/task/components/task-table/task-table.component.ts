import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Task } from '../../class/task';
import { Status } from 'src/app/status/class/status';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { Employee } from 'src/app/classes/employee';
import { TaskService } from '../../services/task.service';
import { StatusEnum } from 'src/app/status/enum/status.enum';
import { StatusService } from 'src/app/status/services/status.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {

  @Input() parentTaskData: Task[] = [];
  @Input() employees: Employee[] = [];
  @Input() allStatus: Status[] = [];

  statusEnum = StatusEnum;
  employeeId: any;
  companyId: any;
  parentTask: Task = {} as Task;
  childData: Task[] = [];
  emptyTask: Task = {} as Task;

  showChildTable: Map<number, boolean> = new Map();    // for opening/ closing child table for task

  constructor(
    private dashboardService: DashboardService,
    private taskService: TaskService,
    private statusService: StatusService
  ) {

    this.employeeId = localStorage.getItem("employeeId");
    this.companyId = localStorage.getItem("companyId");
  }

  ngOnInit(): void {
    // this.getAllStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['parentTaskData']) {
    //   this.showChildTable = new Map();
    // }

    if (changes['emptyTask']) {
      console.log(this.emptyTask);

      this.emptyTask = this.emptyTask;
    }
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
      console.log(task);
      
    // console.log("exist");
    // calling function to get child task using parent id
    this.taskService.getChildTaskByParentId(task.taskId).subscribe(
      (response) => {
        this.childData = [];
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
    // const status = this.allStatus.find(status => task.taskStatus == status.statusId);
    const status = this.statusEnum[task.taskStatus];
    console.log("here " + status);
    if (status) {
      switch (status.toLowerCase()) {
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

  childTask: Task[] = [];
  onClickCreateTask(task: Task) {
    console.log(task);

    this.parentTask = Object.assign({}, task);
    console.log(this.parentTask);
    console.log("hey");

    this.emptyTask.companyId = this.companyId;
    this.emptyTask.taskParent = this.parentTask.taskId;
    this.emptyTask.taskCreatedBy = this.employeeId;
    this.emptyTask.taskAssignedTo = this.employeeId;
    this.emptyTask.taskStatus = this.statusEnum.CREATED;
    this.emptyTask.taskActualStartDate = null as unknown as Date;
    this.emptyTask.taskActualEndDate = null as unknown as Date;

    console.log(this.emptyTask);

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
}
