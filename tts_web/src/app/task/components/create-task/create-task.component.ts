import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../class/task';
import { Employee } from 'src/app/classes/employee';
import { Status } from 'src/app/status/class/status';
import { TaskService } from '../../services/task.service';
import { StatusEnum } from 'src/app/status/enum/status.enum';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { last } from 'rxjs';
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
  @Input() modalId: any;


  @Output() afterCreateTask: EventEmitter<any> = new EventEmitter();
  employeeId: any;
  statusEnum = StatusEnum;
  backupTask: Task = {} as Task; // when we changed assigned to value then it's directly changing actual data in current object so took separate backup data of task for checking
  isLoading: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  // for today's date
  // todayForEndDate: any;
  // todayForStartDate: any;
  currentDate: any = new Date().toISOString().split('T')[0];

  taskName: any;

  fileNames: any
  companyEmployees: Employee[] = [];
  companyId: any;

  // extra variables for validation because not able to display current date and ngModel property binding for same variable
  todayForStartDate: string = '';
  todayForEndDate: string = '';
  todayForPlannedStartDate: string = '';
  todayForPlannedEndDate: string = ''

  constructor(

    private taskService: TaskService,
    private renderer: Renderer2,
    private location: Location,
    private http: HttpClient,
    private dialogueBoxService: DialogueBoxService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.taskName = this.parentTask.taskName;
    console.log(this.taskName);
    console.log("parent Task " + JSON.stringify(this.parentTask));
    this.employeeId = sessionStorage.getItem("employeeId");
    this.companyId = sessionStorage.getItem("companyId");
    //alert(this.companyId);
    this.loadCompanyEmployees();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['parentTask']) {
    //   console.log("parent Task " + JSON.stringify(this.parentTask));
    //   alert()
    // }

    if (changes['task']) {
      this.onChangeTaskObject();
    }
  }

  // called when current task object changed
  private onChangeTaskObject() {

    this.task = this.task;
    console.log(this.task);
    
    this.backupTask = Object.assign({}, this.task);
    console.log(this.backupTask);

    // if task exist 
    if (this.task.taskId > 0) {
      this.getFilesByTaskId(this.task.taskId);

      // if status is not created 
      if (this.task.taskStatus != this.statusEnum.CREATED && this.task.taskStatus != undefined) {
        // if actual start date is not defined then takes current date
        if ((this.task.taskActualStartDate == undefined || this.task.taskActualStartDate == null || !this.task.taskActualStartDate)) {
          this.todayForStartDate = new Date().toISOString().split('T')[0];
          this.task.taskActualStartDate = new Date();

        } else {
          // when status is inprogress then setting actual start date to current date
          this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
        }

        // if status not created
        if (this.task.taskStatus != this.statusEnum.CREATED && this.task.taskStatus != this.statusEnum.INPROGRESS && this.task.taskStatus != undefined) {
          // if actual end date is not defined then takes current date
          if ((this.task.taskActualEndDate == undefined || this.task.taskActualEndDate == null || !this.task.taskActualEndDate)) {
            this.todayForEndDate = new Date().toISOString().split('T')[0];
            this.task.taskActualEndDate = new Date();
          } else {
            // when status is done then setting actual end date to current date
            this.todayForEndDate = new Date(this.task.taskActualEndDate).toISOString().split('T')[0];
          }
        }


      }

    }
  }

  // Load employees by company ID
  loadCompanyEmployees() {

    this.employeeService.getAllEmployeesByCompanyId(this.companyId).subscribe(

      (employees) => {
        this.companyEmployees = employees;
      },
      (error) => {
        console.error('Error fetching company employees:', error);
      }
    );
  }

  taskObject: any;
  // for adding task and reason
  onClickSave(task: Task) {
    this.isLoading = true;
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
        this.showSuccessMessage = true;
        this.taskObject = response;

        // alert("Task created successfully");
        // this.dialogueBoxService.open('task created successfully', 'information')
        // for closing modal after creating task
        // const modalElement = this.createTaskModal.nativeElement;
        // if (modalElement) {
        //   const closeButton = modalElement.querySelector('#closeButton');
        //   if (closeButton) {
        //     this.renderer.selectRootElement(closeButton).click();
        //   }
        // }

        // convey to parent for creating task
        //this.afterCreateTask.emit();
        //this.afterCreateTask.emit();
      },
      (error) => {
        this.showErrorMessage = true;
        console.log("Faild to create task!");
      }
    ).add(() => {
      this.isLoading = false;
    });
  }

  // for updating task and adding reason
  onClickUpdate(task: Task) {
    this.isLoading = true;
    task.employeeId = this.employeeId;    // assigning employee id to object

    const formData = new FormData();    // creating form data to send in header
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);   // adding file in header with key - 'file'
    }

    const tempTask = task;
    tempTask.childTask = [];
    const taskBlob = new Blob([JSON.stringify(tempTask)], { type: 'application/json' });    // converting object into blob 
    formData.append('task', taskBlob);    // adding task object in header with key - 'task'

    // calling service to create or update task and adding reason 
    this.taskService.createOrUpdateTaskAndAddReason(formData).subscribe(
      (response) => {
        this.showSuccessMessage = true;
        // alert("Task updated successfully");

        // // for closing modal after creating task
        // const modalElement = this.createTaskModal.nativeElement;
        // if (modalElement) {
        //   const closeButton = modalElement.querySelector('#closeButton');
        //   if (closeButton) {
        //     this.renderer.selectRootElement(closeButton).click();
        //   }
        // }

        // // convey to parent for updating task
        // this.afterCreateTask.emit();
      },
      (error) => {
        this.showErrorMessage = true;
        console.log("Faild to create task!");
      }
    ).add(() => {
      this.isLoading = false;
    });
  }


  // calling function when use change the status on add task screen
  onChangeStatus(statusId: any, task: Task) {
    // const status = this.allStatus.find(status => statusId == status.statusId);
    // const status = this.statusEnum[statusId];
    //alert("hi" + this.statusEnum.CANCELLED.toString());
    if (statusId) {
      switch (statusId) {

        // for created
        case this.statusEnum.CREATED.toString():
          // console.log("hey");
          this.todayForStartDate = '';
          this.task.taskActualStartDate = null as unknown as Date;

          this.todayForEndDate = '';
          this.task.taskActualEndDate = null as unknown as Date;

          if (!this.updateScreen) {
            this.todayForPlannedStartDate = '';
            this.task.taskStartDate = null as unknown as Date;
            this.task.taskEndDate = null as unknown as Date;
          }

          break;

        // for In progress
        case this.statusEnum.INPROGRESS.toString():
          if (task.taskActualStartDate == undefined || task.taskActualStartDate == null || !task.taskActualStartDate) {
            this.todayForStartDate = new Date().toISOString().split('T')[0];
            this.task.taskActualStartDate = new Date();
            // alert(this.todayForStartDate);

          } else {
            this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
            // alert("exisiting" + this.todayForStartDate);

          }

          this.todayForEndDate = '';
          this.task.taskActualEndDate = null as unknown as Date;
          console.log(this.task);


          // when task is inprogress then set start to current date and end date to null (user will select end date)
          if (!this.updateScreen) {
            if ((this.task.taskActualStartDate == undefined || this.task.taskActualStartDate == null || !this.task.taskActualStartDate)) {
              this.todayForStartDate = new Date().toISOString().split('T')[0];
              this.task.taskActualStartDate = new Date();

            } else {
              // when status is inprogress then setting actual start date to current date
              this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
            }

            this.task.taskStartDate = new Date;
            this.todayForPlannedStartDate = new Date().toISOString().split('T')[0];
            this.task.taskEndDate = null as unknown as Date;
          }

          break;

        // for done
        case (this.statusEnum.CANCELLED.toString()):
          console.log(new Date().toString());

          // when status is done then setting actual end date to current date
          this.todayForEndDate = new Date().toISOString().split('T')[0];
          // alert(this.todayForEndDate);

          this.task.taskActualEndDate = new Date(this.todayForEndDate);

          if (task.taskActualStartDate == undefined || task.taskActualStartDate == null || !task.taskActualStartDate) {
            // when status is inprogress then setting actual start date to current date
            this.todayForStartDate = new Date().toISOString().split('T')[0];
            this.task.taskActualStartDate = new Date();
          } else {
            this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
            console.log(this.todayForStartDate);

          }
          break;
        // for done
        case (this.statusEnum.DONE.toString()):
          console.log(new Date().toString());

          // when status is done then setting actual end date to current date
          this.todayForEndDate = new Date().toISOString().split('T')[0];
          // alert(this.todayForEndDate);

          this.task.taskActualEndDate = new Date(this.todayForEndDate);

          if (task.taskActualStartDate == undefined || task.taskActualStartDate == null || !task.taskActualStartDate) {
            // when status is inprogress then setting actual start date to current date
            this.todayForStartDate = new Date().toISOString().split('T')[0];
            this.task.taskActualStartDate = new Date();
          } else {
            this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
            console.log(this.todayForStartDate);

          }
          break;
      }
    }
  }

  selectedDate!: Date; // This will hold the selected date with timestamp

  onDateSelect(event: any) {
    this.selectedDate = new Date(event.target.value);
    console.log(this.selectedDate);

  }

  selectedFile!: File;
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
  closeModal() {
    const modalElement = this.createTaskModal.nativeElement;
    if (modalElement) {
      const closeButton = modalElement.querySelector('#closeButton');
      if (closeButton) {
        this.renderer.selectRootElement(closeButton).click();
      }
    }
    this.afterCreateTask.emit();
  }




}