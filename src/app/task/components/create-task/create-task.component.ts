import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../class/task';
import { Employee } from 'src/app/classes/employee';
import { Status } from 'src/app/status/class/status';
import { TaskService } from '../../services/task.service';
import { StatusEnum } from 'src/app/status/enum/status.enum';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @ViewChild('createTaskModal') createTaskModal!: ElementRef;

  @Input() parentTask: Task = {} as Task;
  @Input() allEmployees: Employee[] = [];
  @Input() allStatus: Status[] = [];
  @Input() task: Task = {} as Task;
  @Input() updateScreen: boolean = false;

  @Output() afterCreateTask: EventEmitter<any> = new EventEmitter();
  employeeId: any;
  statusEnum = StatusEnum;
  backupTask: Task = {} as Task;
  // for today's date
  // todayForEndDate: any;
  // todayForStartDate: any;
  currentDate: any = new Date().toISOString().split('T')[0];

  taskName: any;

  fileNames: any

  constructor(

    private taskService: TaskService,
    private renderer: Renderer2,
    private location: Location,
    private http: HttpClient,
    private dialogueBoxService: DialogueBoxService
  ) { }

  ngOnInit(): void {
    this.taskName = this.parentTask.taskName;
    console.log(this.taskName);
    console.log("parent Task " + JSON.stringify(this.parentTask));
    this.employeeId = sessionStorage.getItem("employeeId");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentTask']) {
      console.log("parent Task " + JSON.stringify(this.parentTask));
    }

    if (changes['task']) {
      this.task = this.task;
      this.backupTask = Object.assign({}, this.task);
      console.log(this.backupTask);
      if (this.task.taskId > 0)
        this.getFilesByTaskId(this.task.taskId);
    }
  }

  // for adding task and reason
  onClickSave(task: Task) {
    task.employeeId = this.employeeId;    // assigning employee id to object

    const formData = new FormData();    // creating form data to send in header
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);   // adding file in header with key - 'file'
    }

    const taskBlob = new Blob([JSON.stringify(task)], { type: 'application/json' });    // converting object into blob 
    formData.append('task', taskBlob);    // adding task object in header with key - 'task'

    // calling service to create or update task and adding reason 
    this.taskService.createOrUpdateTaskAndAddReason(formData).subscribe(
      (response) => {
        alert("Task created successfully");
        //this.dialogueBoxService.open('Task created successfully', 'information')

        // for closing modal after creating task
        const modalElement = this.createTaskModal.nativeElement;
        if (modalElement) {
          const closeButton = modalElement.querySelector('#closeButton');
          if (closeButton) {
            this.renderer.selectRootElement(closeButton).click();
          }
        }

        // convey to parent for creating task
        this.afterCreateTask.emit();
      },
      (error) => {
        console.log("Faild to create task!");
      }
    );
  }

  // for updating task and adding reason
  onClickUpdate(task: Task) {

    task.employeeId = this.employeeId;    // assigning employee id to object

    const formData = new FormData();    // creating form data to send in header
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);   // adding file in header with key - 'file'
    }

    const taskBlob = new Blob([JSON.stringify(task)], { type: 'application/json' });    // converting object into blob 
    formData.append('task', taskBlob);    // adding task object in header with key - 'task'

    // calling service to create or update task and adding reason 
    this.taskService.createOrUpdateTaskAndAddReason(formData).subscribe(
      (response) => {
        alert("Task updated successfully");

        // for closing modal after creating task
        const modalElement = this.createTaskModal.nativeElement;
        if (modalElement) {
          const closeButton = modalElement.querySelector('#closeButton');
          if (closeButton) {
            this.renderer.selectRootElement(closeButton).click();
          }
        }

        // convey to parent for updating task
        this.afterCreateTask.emit();
      },
      (error) => {
        console.log("Faild to create task!");
      }
    );
  }


  // calling function when use change the status on add task screen
  onChangeStatus(statusId: any) {
    // const status = this.allStatus.find(status => statusId == status.statusId);
    // const status = this.statusEnum[statusId];
    if (statusId) {
      switch (statusId) {

        // for created
        case this.statusEnum.CREATED.toString():
          // console.log("hey");
          // this.todayForStartDate = '';
          this.task.taskActualStartDate = null as unknown as Date;

          // this.todayForEndDate = '';
          this.task.taskActualEndDate = null as unknown as Date;
          break;

        // for In progress
        case this.statusEnum.INPROGRESS.toString():
          // when status is inprogress then setting actual start date to current date
          // this.todayForStartDate = new Date().toISOString().split('T')[0];
          // this.task.taskActualStartDate = new Date();

          // this.todayForEndDate = '';
          this.task.taskActualEndDate = null as unknown as Date;
          console.log(this.task);

          break;

        // for done
        case this.statusEnum.DONE.toString():
          console.log(new Date().toString());

          // when status is done then setting actual end date to current date
          // this.todayForEndDate = new Date().toISOString().split('T')[0];
          // console.log(this.todayForEndDate);

          // this.task.taskActualEndDate = new Date(this.todayForEndDate);

          // this.todayForStartDate = '';
          // this.task.taskActualStartDate = null as unknown as Date;
          break;

      }
    }
  }

  selectedDate!: Date; // This will hold the selected date with timestamp

  onDateSelect(event: any) {
    this.selectedDate = new Date(event.target.value);
    console.log(this.selectedDate);

  }

  selectedFile !: File;
  // called on file selected
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // for getting files by task id
  getFilesByTaskId(taskId: number) {
    this.taskService.getFilesByTaskId(taskId).subscribe(
      (response) => {
        this.fileNames = response;
        console.log(this.fileNames);

      }
    );
  }

  // calling service to get file using file name and task id
  downloadFile(fileName: string) {
    // Make an API request to get the blob data
    this.taskService.downloadFileByTaskIdAndFileName(this.task.taskId, fileName).subscribe((blobData: Blob) => {
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
}
