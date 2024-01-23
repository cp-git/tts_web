import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task2 } from 'src/app/classes/task2';
import { Task } from '../../class/task';
import { Status } from 'src/app/status/class/status';
import { Employee } from 'src/app/classes/employee';
import { StatusEnum } from 'src/app/status/enum/status.enum';
import { Visa } from 'src/app/visa/class/visa';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-view-child-data',
  templateUrl: './view-child-data.component.html',
  styleUrls: ['./view-child-data.component.css']
})
export class ViewChildDataComponent {

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
  @Input() loggedInUserData!: Employee;

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

  loggedInUserData1!: any;

  allStatusFiltered: Status[] = [];

  constructor(
    private _route: ActivatedRoute,
    private taskService: TaskService
  ) {

    this.displayCompanyLogo = `${environment.companyUrl}/photos`;
    this.displayEmployeeLogo = `${environment.employeeUrl}/employee/photos`;
    this.employeeId = sessionStorage.getItem("employeeId");
    this.companyId = sessionStorage.getItem("companyId");

    this.loggedInUserData1 = sessionStorage.getItem('empData');

    this.loggedInUserData = JSON.parse(this.loggedInUserData1);


    this.parentTask.taskId = 0;

  }


  ngOnInit(): void {

    let taskId = this._route.snapshot.params['taskId'];
    console.log(taskId);



    this.taskService.getTaskCreatedByMeOrAssignedToMe(this.employeeId).subscribe(
      (response) => {
        this.parentAndAllTask = response;
        console.log(this.parentAndAllTask.childTasks);











      }
    );



  }




}
