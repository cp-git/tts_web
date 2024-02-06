import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from '../class/task';
import { Task2 } from 'src/app/classes/task2';
import { Status } from 'src/app/status/class/status';
import { Employee } from 'src/app/classes/employee';
import { StatusEnum } from 'src/app/status/enum/status.enum';
import { Visa } from 'src/app/visa/class/visa';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { TaskService } from '../services/task.service';
import { StatusService } from 'src/app/status/services/status.service';
import { VisaService } from 'src/app/visa/services/visa.service';
import { TextypeService } from 'src/app/taxtype/services/textype.service';
import { JoblocationService } from 'src/app/joblocation/services/joblocation.service';
import { JobportalService } from 'src/app/jobportal/services/jobportal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {

  INTERNAL_PLACEMENT_ID: number = 1;
  EXTERNAL_PLACEMENT_ID: number = 2;

  @Input() parentTaskData: Task[] = [];

  @Input() parentAndAllTask!: Task2;
  @Input() filteredStatus!: Status[];
  @Input() filteredEmployees!: Employee[];
  @Input() employees: Employee[] = [];
  @Input() allStatus: Status[] = [];
  @Input() modalId: number = 0;
  @Input() task: Task = {} as Task;
  // @Input() loggedInUserData!: Employee;

  statusEnum = StatusEnum;
  employeeId: any;
  companyId: any;
  parentTask: Task = {} as Task;
  childData: Task[] = [];
  emptyTask: Task = {} as Task;
  emptyTaskRow: Task = {} as Task;
  selectedDateFormat!: string;
  formattedDate: string = '';
  dateFormat: string = 'shortDate'; // Default format
  showChildTable: Map<number, boolean> = new Map();    // for opening/ closing child table for task

  childTask: Task[] = [];

  allVisas: Visa[] = [];
  allTaxTypes: Taxtype[] = [];
  allJobLocations: Joblocation[] = [];
  allJobPortals: Jobportal[] = [];

  updateScreen: boolean = false;
  toggledTasksIds: Set<any> = new Set<any>();;
  displayCompanyLogo: any;

  public id!: any;

  ParentTaskInfo!: Task;

  displayEmployeeLogo: any;

  childTaskData: Task[] = [];

  loggedInUserData: any;

  allStatusFiltered: Status[] = [];

  

  constructor(
    private taskService: TaskService,
    private statusService: StatusService,
    private visaService: VisaService,
    private taxTypeService: TextypeService,
    private jobLocationService: JoblocationService,
    private jobPortalService: JobportalService,
    private _router: Router,
    private _route: ActivatedRoute,
    private dashboardService: DashboardService,
    private location: Location,
    private _spinner: NgxSpinnerService
  ) {
    this.displayCompanyLogo = `${environment.companyUrl}/photos`;
    this.displayEmployeeLogo = `${environment.employeeUrl}/employee/photos`;
    this.employeeId = sessionStorage.getItem("employeeId");
    this.companyId = sessionStorage.getItem("companyId");

    this.loggedInUserData= sessionStorage.getItem('empData');

    this.loggedInUserData = JSON.parse(this.loggedInUserData);


    this.parentTask.taskId = 0;
  }


  ngOnInit(): void {


    console.log(this.companyId);

    this.getDataForDropdowns();
    this.getAllEmployees();

    console.log(this.loggedInUserData.showAllTasks);
    

    // Attempt to retrieve the selected date format from localStorage
    const storedFormat = localStorage.getItem('selectedDateFormat');

    // If a format is found in localStorage, use it; otherwise, use the default format
    this.selectedDateFormat = storedFormat || 'MM-dd-yyyy';
    this.getAllStatus();

    let taskId = this._route.snapshot.params['taskId'];
    console.log(taskId);


    if(this.loggedInUserData.showAllTasks){
      this.taskService.getAllParentTasksByCompanyId(this.companyId).subscribe(
        (response) => {
          console.log(response);

          this.parentAndAllTask = response;

           for (let j = 0; j < this.parentAndAllTask.parentTasks.length; j++) {
            if (this.parentAndAllTask.parentTasks[j].taskId == taskId) {
              // console.log(this.parentAndAllTask.parentTasks[j]);
              this.ParentTaskInfo = this.parentAndAllTask.parentTasks[j];
              console.log(this.ParentTaskInfo.taskId);
  
              for (let k = 0; k < this.parentAndAllTask.childTasks.length; k++) {
                if (this.parentAndAllTask.childTasks[k].taskParent == this.ParentTaskInfo.taskId) {
                  console.log(this.parentAndAllTask.childTasks[k]);
                  this.childTaskData.push(this.parentAndAllTask.childTasks[k])
                  console.log(this.childTaskData);
  
  
                }
              }
  
  
  
  
            }
          }
  
        
        }
      );
    }else{

      this.taskService.getTaskCreatedByMeOrAssignedToMe(this.employeeId).subscribe(
        (response) => {
          this.parentAndAllTask = response;
          console.log(this.parentAndAllTask);
  
          for (let j = 0; j < this.parentAndAllTask.parentTasks.length; j++) {
            if (this.parentAndAllTask.parentTasks[j].taskId == taskId) {
              // console.log(this.parentAndAllTask.parentTasks[j]);
              this.ParentTaskInfo = this.parentAndAllTask.parentTasks[j];
              console.log(this.ParentTaskInfo.taskId);
  
              for (let k = 0; k < this.parentAndAllTask.childTasks.length; k++) {
                if (this.parentAndAllTask.childTasks[k].taskParent == this.ParentTaskInfo.taskId) {
                  console.log(this.parentAndAllTask.childTasks[k]);
                  this.childTaskData.push(this.parentAndAllTask.childTasks[k])
                  console.log(this.childTaskData);
  
  
                }
              }
  
  
  
  
            }
          }
  
        }
      );

    }
    



   


  }

  

  private getAllEmployees() {
    this.dashboardService.getAllEmployees(this.companyId).subscribe(
      (response) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error) => {
        //console.log('Failed to get all employees');
      }
    );
  }


  getDataForDropdowns() {
    this.taskService.getAllVisasByCompanyId(this.companyId).subscribe(
      (response) => {
        console.log(response);

        this.allVisas = response;
      }
    );
    this.taskService.getAllTaxTypesByCompanyId(this.companyId).subscribe(
      (response) => {
        this.allTaxTypes = response;
      }
    );
    this.taskService.getAllJobLocationsByCompanyId(this.companyId).subscribe(
      (response) => {
        this.allJobLocations = response;
      }
    );
    this.taskService.getAllJobPortalsByCompanyId(this.companyId).subscribe(
      (response) => {
        this.allJobPortals = response;
      }
    )
  }


  onClickCreateTask(task: Task, operation: string, event: Event) {

    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
    }, 2000);

    event.stopPropagation();

    // for getting update task status
    if (task != null && task.taskId != undefined) {
      this.taskService.getTaskByTaskId(task.taskId).subscribe(
        response => {
          // this.parentTaskStatus = this.allStatus.find(s => s.statusId == response.taskStatus);
        }
      );
    }
    // //console.log(taskData);

    this.emptyTask = {} as Task;
    this.updateScreen = false;
    this.parentTask = {} as Task;

    console.log(task);
    //console.log(operation);

    if (operation == 'ADD') {

      console.log(task);

      this.updateScreen = false;
      this.parentTask = Object.assign({}, task);

      this.emptyTask.companyId = this.companyId;

      if (this.parentTask.taskParent == undefined || this.parentTask.taskParent == null) {
        this.emptyTask.taskParent = 0;
      }
      else {
        this.emptyTask.taskParent = this.parentTask.taskId;
      }

      this.emptyTask.taskCreatedBy = this.employeeId;
      this.emptyTask.taskAssignedTo = this.employeeId;
      this.emptyTask.taskStatus = this.allStatus[0].statusId;
      this.emptyTask.taskActualStartDate = null as unknown as Date;
      this.emptyTask.taskActualEndDate = null as unknown as Date;
      this.emptyTask.placementId = this.INTERNAL_PLACEMENT_ID;
      // this.emptyTask.taxTypeId = 0;

    }
    else if (operation == 'UPDATE') {

      this.updateScreen = true;
      console.log(task);

      if (task.taskParent > 0) {
        this.taskService.getTaskByTaskId(task.taskParent).subscribe(
          (response) => {
            // on success 
            this.parentTask = response;
            // console.log(this.parentTask);
          }
        );
      }

      // get task and internal/external task data by task id
      this.taskService.getTaskByTaskId(task.taskId).subscribe(
        (response) => {
          // on success 
          task = response;
          // console.log(task);
          this.emptyTask = Object.assign({}, task);
        }
      );

      this.emptyTask = Object.assign({}, task);
      // console.log(this.emptyTask);

    }
  }





  NavigateParentView(taskId: number) {
    this._router.navigate(['/taskView', taskId])

  }

  private getAllStatus() {
    this.statusService.getAllStatus().subscribe(
      (response) => {
        // store all status
        this.allStatus = response;

        for (let k = 0; k <= this.allStatus.length; k++) {
          // console.log(this.allStatus[k]);

          if (this.allStatus[k].companyId == this.companyId) {
            // console.log("@@Data...");

            // console.log(this.allStatus[k].statusId);
            this.allStatusFiltered.push(this.allStatus[k]);
            // console.log(this.allStatusFiltered);


          }

        }

        //console.log(this.allStatus);

      },
      (error) => {
        //console.log("Failed to get all status");
      }
    );
  }




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

    this._router.navigate(['/']); // Navigate to the root URL
  }

  afterCreateTask() {
    location.reload();
  }

  backToDisplayTask() {
    this.location.back();
  }


  NavigateChildView(taskParent: number) {
    console.log(taskParent);

    this._router.navigate(['/childview', taskParent])
  }


}
