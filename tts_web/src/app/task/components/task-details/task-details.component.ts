import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../class/task';
import { Employee } from 'src/app/employee/class/employee';
import { Status } from 'src/app/status/class/status';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() parentTask: Task = {} as Task;
  @Input() allEmployees: Employee[] = [];
  @Input() allStatus: Status[] = [];
  @Input() task: Task = {} as Task;
  @Input() updateScreen: boolean = false;

  backupTask: Task = {} as Task; // when we changed assigned to value then it's directly changing actual data in current object so took separate backup data of task for checking

  actualTaskStatus: any;
  currentTaskStatus: any;

  todayForStartDate: string = '';
  todayForEndDate: string = '';
  todayForPlannedStartDate: string = '';
  todayForPlannedEndDate: string = '';
  parentTaskStatus: any;

  fileNames: any;
  employeeId: any;

  todayDate!: string;
  selectedFile!: File;

  constructor(private taskService: TaskService) {
    this.todayDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {}

  downloadFile(fileName: string) {
    // Make an API request to get the blob data
    this.taskService
      .downloadFileByTaskIdAndFileName(this.task.taskId, fileName)
      .subscribe((blobData: Blob) => {
        // Create a blob URL
        const blobUrl = URL.createObjectURL(blobData);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = blobUrl;

        // Set the download attribute and file name
        a.download = fileName; // Set the desired file name here

        // Trigger a click event on the anchor to initiate the download
        a.click();

        // Clean up: revoke the blob URL after the download
        URL.revokeObjectURL(blobUrl);
      });
  }

  // calling function when use change the status on add task screen
  onChangeStatus(statusId: any, task: Task) {
    this.currentTaskStatus = this.allStatus.find((s) => s.statusId == statusId);
    if (this.currentTaskStatus) {
      // for created
      if (
        this.currentTaskStatus.actualStartDate == false &&
        this.currentTaskStatus.actualEndDate == false
      ) {
        // //console.log("hey");
        this.todayForStartDate = '';
        this.task.taskActualStartDate = null as unknown as Date;

        this.todayForEndDate = '';
        this.task.taskActualEndDate = null as unknown as Date;

        if (!this.updateScreen) {
          this.todayForPlannedStartDate = '';
          this.task.taskStartDate = null as unknown as Date;
          this.task.taskEndDate = null as unknown as Date;
        }
      }
      // for In progress
      if (
        this.currentTaskStatus.actualStartDate == true &&
        this.currentTaskStatus.actualEndDate == false
      ) {
        if (
          this.task.taskActualStartDate == undefined ||
          this.task.taskActualStartDate == null ||
          !this.task.taskActualStartDate
        ) {
          this.todayForStartDate = new Date().toISOString().split('T')[0];
          this.task.taskActualStartDate = new Date();
          // alert(this.todayForStartDate);
        } else {
          this.todayForStartDate = new Date(this.task.taskActualStartDate)
            .toISOString()
            .split('T')[0];
          // alert("exisiting" + this.todayForStartDate);
        }

        this.todayForEndDate = '';
        this.task.taskActualEndDate = null as unknown as Date;
        //console.log(this.task);

        // when task is inprogress then set start to current date and end date to null (user will select end date)
        if (!this.updateScreen) {
          if (
            this.task.taskActualStartDate == undefined ||
            this.task.taskActualStartDate == null ||
            !this.task.taskActualStartDate
          ) {
            this.todayForStartDate = new Date().toISOString().split('T')[0];
            this.task.taskActualStartDate = new Date();
          } else {
            // when status is inprogress then setting actual start date to current date
            this.todayForStartDate = new Date(this.task.taskActualStartDate)
              .toISOString()
              .split('T')[0];
          }

          this.task.taskStartDate = new Date();
          this.todayForPlannedStartDate = new Date()
            .toISOString()
            .split('T')[0];
          this.task.taskEndDate = null as unknown as Date;
        }
      }

      // for done and cancelled
      if (
        this.currentTaskStatus.actualStartDate == true &&
        this.currentTaskStatus.actualEndDate == true
      ) {
        //console.log(new Date().toString());

        // when status is done then setting actual end date to current date
        this.todayForEndDate = new Date().toISOString().split('T')[0];
        // alert(this.todayForEndDate);

        this.task.taskActualEndDate = new Date(this.todayForEndDate);

        if (
          this.task.taskActualStartDate == undefined ||
          this.task.taskActualStartDate == null ||
          !this.task.taskActualStartDate
        ) {
          // when status is inprogress then setting actual start date to current date
          this.todayForStartDate = new Date().toISOString().split('T')[0];
          this.task.taskActualStartDate = new Date();
        } else {
          this.todayForStartDate = new Date(this.task.taskActualStartDate)
            .toISOString()
            .split('T')[0];
        }
      }
    }
  }

  // called on file selected
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
