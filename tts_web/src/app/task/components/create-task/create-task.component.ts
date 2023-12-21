import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../class/task';
import { Status } from 'src/app/status/class/status';
import { TaskService } from '../../services/task.service';
import { StatusEnum } from 'src/app/status/enum/status.enum';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { last } from 'rxjs';
import { Employee } from 'src/app/employee/class/employee';
import { Visa } from 'src/app/visa/class/visa';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  INTERNAL_PLACEMENT_ID: number = 1;
  EXTERNAL_PLACEMENT_ID: number = 2;
  PLACEMENT_ID: number = 1;

  @ViewChild('createTaskModal') createTaskModal!: ElementRef;

  @Input() parentTask: Task = {} as Task;
  @Input() allEmployees: Employee[] = [];
  @Input() allStatus: Status[] = [];
  @Input() task: Task = {} as Task;
  @Input() updateScreen: boolean = false;
  @Input() modalId: any;
  @Input() allVisas: Visa[] = [];
  @Input() allJobLocations: Joblocation[] = [];
  @Input() allJobPortals: Jobportal[] = [];
  @Input() allTaxTypes: Taxtype[] = [];

  @Output() afterCreateTask: EventEmitter<any> = new EventEmitter();
  employeeId: any;
  // statusEnum = StatusEnum;
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
  todayDate!: string;
  parentTaskStatus: any;

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
    //console.log(this.taskName);
    //console.log("parent Task " + JSON.stringify(this.parentTask));
    this.employeeId = sessionStorage.getItem("employeeId");
    this.companyId = sessionStorage.getItem("companyId");
    //alert(this.companyId);
    this.loadCompanyEmployees();

    this.todayDate = new Date().toISOString().split('T')[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['parentTask']) {
    //   //console.log("parent Task " + JSON.stringify(this.parentTask));
    //   alert()
    // }

    if (changes['task']) {

      this.onChangeTaskObject();
    }
  }

  // called when current task object changed
  private onChangeTaskObject() {

    this.task = this.task;
    //console.log(this.task);
    // if(this.task.taskParent==undefined||this.task.taskParent==null){
    //   this.task.taskParent = 0;
    // }
    if (this.task && this.task.taskParent) {
      this.taskService.getTaskByTaskId(this.task.taskParent).subscribe(
        response => {
          //console.log(response);
          this.parentTaskStatus = this.allStatus.find(s => s.statusId == response.taskStatus);
          //console.log(this.parentTaskStatus);

        }
      );
    }
    this.getCurrentTaskStatus();
    this.backupTask = Object.assign({}, this.task);
    //console.log(this.backupTask);

    // if task exist 
    if (this.task.taskId > 0) {

      // date posted string to date
      // this.task.datePosted = new Date(this.task.datePosted);
      this.getFilesByTaskId(this.task.taskId);

      // Get the current status based on the task status ID
      const currentStatus = this.allStatus.find(status => status.statusId === this.task.taskStatus);
      if (currentStatus) {
        // if status is not created 
        if (!(currentStatus.actualStartDate == false && currentStatus.actualEndDate == false)) {
          // if actual start date is not defined then takes current date
          if ((this.task.taskActualStartDate == undefined || this.task.taskActualStartDate == null || !this.task.taskActualStartDate)) {
            this.todayForStartDate = new Date().toISOString().split('T')[0];
            this.task.taskActualStartDate = new Date();

          } else {
            // when status is inprogress then setting actual start date to current date
            this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
          }

          // if status not created
          if (((currentStatus.actualStartDate == true && currentStatus.actualEndDate == true))) {
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
        //console.log("Faild to create task!");
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
        //console.log("Faild to create task!");
      }
    ).add(() => {
      this.isLoading = false;
    });
  }

  currentStatus!: any;
  // calling function when use change the status on add task screen
  onChangeStatus(statusId: any, task: Task) {
    //console.log(this.backupTask);

    // const status = this.allStatus.find(status => statusId == status.statusId);
    // const status = this.statusEnum[statusId];
    //alert("hi" + this.statusEnum.CANCELLED.toString());

    this.currentTaskStatus = this.allStatus.find(s => s.statusId == statusId);
    if (this.currentTaskStatus) {

      // for created
      if (this.currentTaskStatus.actualStartDate == false && this.currentTaskStatus.actualEndDate == false) {

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
      if (this.currentTaskStatus.actualStartDate == true && this.currentTaskStatus.actualEndDate == false) {
        if (this.task.taskActualStartDate == undefined || this.task.taskActualStartDate == null || !this.task.taskActualStartDate) {
          this.todayForStartDate = new Date().toISOString().split('T')[0];
          this.task.taskActualStartDate = new Date();
          // alert(this.todayForStartDate);

        } else {
          this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
          // alert("exisiting" + this.todayForStartDate);

        }

        this.todayForEndDate = '';
        this.task.taskActualEndDate = null as unknown as Date;
        //console.log(this.task);


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

      }

      // for done and cancelled
      if (this.currentTaskStatus.actualStartDate == true && this.currentTaskStatus.actualEndDate == true) {
        //console.log(new Date().toString());

        // when status is done then setting actual end date to current date
        this.todayForEndDate = new Date().toISOString().split('T')[0];
        // alert(this.todayForEndDate);

        this.task.taskActualEndDate = new Date(this.todayForEndDate);

        if (this.task.taskActualStartDate == undefined || this.task.taskActualStartDate == null || !this.task.taskActualStartDate) {
          // when status is inprogress then setting actual start date to current date
          this.todayForStartDate = new Date().toISOString().split('T')[0];
          this.task.taskActualStartDate = new Date();
        } else {
          this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
          //console.log(this.todayForStartDate);

        }
      }
      // for done
      // if (this.currentTaskStatus.actualStartDate == true && this.currentTaskStatus.actualEndDate == true) {
      //   //console.log(new Date().toString());

      //   // when status is done then setting actual end date to current date
      //   this.todayForEndDate = new Date().toISOString().split('T')[0];
      //   // alert(this.todayForEndDate);

      //   this.task.taskActualEndDate = new Date(this.todayForEndDate);

      //   if (this.task.taskActualStartDate == undefined || this.task.taskActualStartDate == null || !this.task.taskActualStartDate) {
      //     // when status is inprogress then setting actual start date to current date
      //     this.todayForStartDate = new Date().toISOString().split('T')[0];
      //     this.task.taskActualStartDate = new Date();
      //   } else {
      //     this.todayForStartDate = new Date(this.task.taskActualStartDate).toISOString().split('T')[0];
      //     //console.log(this.todayForStartDate);

      //   }
      // }


    }
    //console.log(this.backupTask);

  }


  // selectedDate!: Date; // This will hold the selected date with timestamp

  // onDateSelect(event: any) {
  //   this.selectedDate = new Date(event.target.value);
  //   //console.log(this.selectedDate);

  // }

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
        //console.log(this.fileNames);

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

  actualTaskStatus: any;
  currentTaskStatus: any;
  getCurrentTaskStatus(): any {
    const taskStatus = this.task.taskStatus;
    this.currentTaskStatus = this.allStatus.find((status) => status.statusId === taskStatus);
    this.actualTaskStatus = this.currentTaskStatus
  }

}