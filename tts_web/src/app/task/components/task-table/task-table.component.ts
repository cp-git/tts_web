import { Component, ElementRef, Input, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../class/task';
import { Status } from 'src/app/status/class/status';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { TaskService } from '../../services/task.service';
import { StatusEnum } from 'src/app/status/enum/status.enum';
import { StatusService } from 'src/app/status/services/status.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task2 } from 'src/app/classes/task2';
import { Employee } from 'src/app/employee/class/employee';
import { Visa } from 'src/app/visa/class/visa';
import { VisaService } from 'src/app/visa/services/visa.service';
import { JoblocationService } from 'src/app/joblocation/services/joblocation.service';
import { TextypeService } from 'src/app/taxtype/services/textype.service';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { JobportalService } from 'src/app/jobportal/services/jobportal.service';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReasonService } from 'src/app/reason/services/reason.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { InternalExternalTaskDTO } from '../../class/internal-external-task-dto';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { environment } from 'src/environments/environment.dev';
import { Login } from 'src/app/login/class/login';
import { DatePipe } from '@angular/common';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {
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
  displayCompanyLogo: any;
  childTask: Task[] = [];

  allVisas: Visa[] = [];
  allTaxTypes: Taxtype[] = [];
  allJobLocations: Joblocation[] = [];
  allJobPortals: Jobportal[] = [];
  selectedParentIds: number[] = [];
  reasons: any[] = [];
  updateScreen: boolean = false;
  intExtDto: InternalExternalTaskDTO[] = [];
  toggledTasksIds: Set<any> = new Set<any>();;

  constructor(
    private taskService: TaskService,
    private statusService: StatusService,
    private reasonService: ReasonService,
    private datePipe: DatePipe
  ) {

    this.employeeId = sessionStorage.getItem("employeeId");
    this.companyId = sessionStorage.getItem("companyId");
    this.displayCompanyLogo = `${environment.companyUrl}/photos/${this.companyId}`;
    this.parentTask.taskId = 0;
  }

  ngOnInit(): void {

    this.getDataForDropdowns();

    // Attempt to retrieve the selected date format from localStorage
    const storedFormat = localStorage.getItem('selectedDateFormat');

    // If a format is found in localStorage, use it; otherwise, use the default format
    this.selectedDateFormat = storedFormat || 'MM-dd-yyyy';
    // this.getAllStatus();

  }

  onCheckboxChange(taskId: number) {
    if (this.selectedParentIds.includes(taskId)) {
      // Remove the taskId if it's already in the array
      this.selectedParentIds = this.selectedParentIds.filter(id => id !== taskId);

    } else {
      // Add the taskId to the array
      this.selectedParentIds.push(taskId);
      // this.isCheckboxChecked = true;
    }

    // console.log('Selected Parent IDs:', this.selectedParentIds);
  }
  async getImageFromApi(): Promise<string> {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await fetch(this.displayCompanyLogo);
      const buffer = await response.arrayBuffer();
      return 'data:image/jpeg;base64,' + btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    } catch (error) {
      console.error('Error fetching image from API:', error);
      throw error;
    }
  }
  // Method to fetch reasons related to a specific task by its ID
  getReasonsByTaskId(taskId: number): void {
    this.reasonService.getReasonsByTaskId(taskId).subscribe(
      (data: any) => {
        this.reasons = data; // Store the retrieved reasons in the reasons array
        // // console.log(JSON.stringify(this.reasons));

      },
      (error: any) => {
        alert('Error fetching reasons:');
      }
    );
  }

  async generatePDF() {
    const data: any = await this.taskService.getAllChildTaskAndParentTaskBySelectedParentTasks(this.selectedParentIds).toPromise();
    if (data) {
      this.intExtDto = data[0];
      // console.log(this.intExtDto);
    }

    const imageData: string = await this.getImageFromApi();

    const pdfContent: Content = [];
    const headerCellStyle = {
      fillColor: '#34495E',
      bold: true,
      fontSize: 12,
      alignment: 'center',
      color: 'white',
      margin: [5, 5],
    };

    const reasonHeader = {
      fillColor: '#A76AFF',
      bold: true,
      fontSize: 12,
      alignment: 'center',
      color: 'white',
      margin: [5, 5],
    };
    const taskFor = [
      {
        bold: true,
      },
    ];

    const parentTasks = this.intExtDto.filter(task => task.taskParent === 0);
    const childTasks = this.intExtDto.filter(task => task.taskParent > 0);

    pdfContent.push({
      image: imageData,
      width: 100,
      height: 70,
    });

    for (const parentTask of parentTasks) {
      pdfContent.push({
        text: "Task Owner - " + (this.employees.find(emp => parentTask.taskCreatedBy == emp.employeeId))?.firstName + " " + (this.employees.find(emp => parentTask.taskCreatedBy == emp.employeeId))?.lastName,
        style: taskFor
      }, {
        text: "Assigned To - " + (this.employees.find(emp => parentTask.taskAssignedTo == emp.employeeId))?.firstName + " " + (this.employees.find(emp => parentTask.taskAssignedTo == emp.employeeId))?.lastName,
        style: taskFor
      });

      const backgroundColor = parentTask.taskParent === 0 ? '#CFF4FC' : 'white';

      const headerRow = [
        { text: 'Task Name', style: headerCellStyle },
        { text: 'Task Description', style: headerCellStyle },
        { text: 'Start Date', style: headerCellStyle },
        { text: 'End Date', style: headerCellStyle },
        { text: 'Status', style: headerCellStyle },
        { text: 'Placement Type', style: headerCellStyle }
      ];

      pdfContent.push({
        table: {
          widths: [100, 150, 100, 100, 100, 100],
          body: [headerRow]
        }
      });

      const parentRow = [
        { text: parentTask.taskName, fillColor: backgroundColor },
        { text: parentTask.taskDescription, fillColor: backgroundColor },
        { text: parentTask.taskStartDate, fillColor: backgroundColor },
        { text: parentTask.taskEndDate, fillColor: backgroundColor },
        { text: (this.allStatus.find(status => parentTask.taskStatus == status.statusId))?.statusCode, fillColor: backgroundColor },
        { text: parentTask.placementId === 1 ? 'Internal Candidate' : parentTask.placementId === 2 ? 'External Candidate' : 'Unknown', fillColor: backgroundColor, width: 100 }
      ];

      pdfContent.push({
        table: {
          widths: [100, 150, 100, 100, 100, 100],
          body: [parentRow]
        }
      });
      pdfContent.push({ text: '', margin: [0, 5] });
      pdfContent.push({ text: 'Change History - ' + parentTask.taskName, style: taskFor });

      try {
        const reasonData = await this.reasonService.getReasonsByTaskId(parentTask.taskId).toPromise();
        if (reasonData) {
          this.reasons = reasonData;
          // console.log(JSON.stringify(this.reasons));

          const reasonBg = parentTask.taskParent === 0 ? '#FFF6F1 ' : 'white';
          const taskReson: any = this.reasons.map(reason => [
            { text: this.datePipe.transform(reason.chgDateTime, 'MM-dd-yyyy HH:mm'), fillColor: reasonBg },
            { text: reason.reasonText, fillColor: reasonBg },
            { text: this.allStatus.find(status => reason.statusId == status.statusId)?.statusCode, fillColor: reasonBg },
            { text: this.employees.find(emp => reason.employeeId == emp.employeeId)?.firstName, fillColor: reasonBg },
            { text: this.employees.find(emp => reason.assignedTo == emp.employeeId)?.firstName, fillColor: reasonBg }
          ]);
          // console.log("hey2");
          const reasonsHeaderRow = [
            { text: 'Change Date', style: reasonHeader },
            { text: 'Comments', style: reasonHeader },
            { text: 'Status', style: reasonHeader },
            { text: 'Created By', style: reasonHeader },
            { text: 'Assigned To', style: reasonHeader }
          ];
          // console.log(JSON.stringify(taskReson));

          pdfContent.push({
            table: {
              widths: [160, 200, 100, 100, 100],
              body: [reasonsHeaderRow, ...taskReson]
            }
          });

        }
      } catch (error) {
        console.error('Error fetching reasons:', error);
      }
      pdfContent.push({ text: '', margin: [0, 5] });
      const associatedChildTasks = childTasks.filter(childTask => childTask.taskParent === parentTask.taskId);

      for (const childTask of associatedChildTasks) {
        if (childTask.externalId > 0) {
          pdfContent.push({ text: "Candidate Name - " + childTask.candidateName, style: taskFor })
        }
        pdfContent.push({ text: "Task Owner - " + (this.employees.find(emp => childTask.taskCreatedBy == emp.employeeId))?.firstName + " " + (this.employees.find(emp => childTask.taskCreatedBy == emp.employeeId))?.lastName + "    " + "Assigned To - " + (this.employees.find(emp => childTask.taskAssignedTo == emp.employeeId))?.firstName + " " + (this.employees.find(emp => childTask.taskAssignedTo == emp.employeeId))?.lastName, style: taskFor });

        const childRow = [
          `Hiring Company Name  : ${childTask.hiringCompanyName},
              Job Title : ${childTask.jobTitle}
              Job City  : ${childTask.jobCity},
              Job State : ${childTask.jobState}
              Rate  : ${childTask.rate}`
        ];

        const childTableConfig = {
          widths: [690],
          body: [childRow],
        };

        pdfContent.push({ table: childTableConfig });

        pdfContent.push({ text: '', margin: [0, 5] });
        pdfContent.push({ text: 'Change History - ' + childTask.taskName, style: taskFor });

        try {
          const reasonData = await this.reasonService.getReasonsByTaskId(childTask.taskId).toPromise();
          if (reasonData) {
            this.reasons = reasonData;
            // console.log(JSON.stringify(this.reasons));

            const reasonBg = parentTask.taskParent === 0 ? '#FFF6F1 ' : 'white';
            const taskReson: any = this.reasons.map(reason => [
              { text: this.datePipe.transform(reason.chgDateTime, 'MM-dd-yyyy HH:mm'), fillColor: reasonBg },
              { text: reason.reasonText, fillColor: reasonBg },
              { text: this.allStatus.find(status => reason.statusId == status.statusId)?.statusCode, fillColor: reasonBg },
              { text: this.employees.find(emp => reason.employeeId == emp.employeeId)?.firstName, fillColor: reasonBg },
              { text: this.employees.find(emp => reason.assignedTo == emp.employeeId)?.firstName, fillColor: reasonBg }
            ]);
            // console.log("hey2");
            const reasonsHeaderRow = [
              { text: 'Change Date', style: reasonHeader },
              { text: 'Comments', style: reasonHeader },
              { text: 'Status', style: reasonHeader },
              { text: 'Created By', style: reasonHeader },
              { text: 'Assigned To', style: reasonHeader }
            ];
            // console.log(JSON.stringify(taskReson));

            pdfContent.push({
              table: {
                widths: [160, 200, 100, 100, 100],
                body: [reasonsHeaderRow, ...taskReson]
              }
            });
            pdfContent.push({ text: ' ', margin: [0, 5] });
          }
        } catch (error) {
          console.error('Error fetching reasons:', error);
        }
      }


    }

    const documentDefinition: TDocumentDefinitions = {
      pageOrientation: 'landscape',
      content: pdfContent,
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }



  getDataForDropdowns() {
    this.taskService.getAllVisasByCompanyId(this.companyId).subscribe(
      (response) => {
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
  // Function to handle changes to the selected date format
  onDateFormatChange() {
    // Store the selected format in localStorage
    localStorage.setItem('selectedDateFormat', this.selectedDateFormat);
  }


  ngOnChanges(changes: SimpleChanges): void {
    // re-initialize showChildTable
    // if (changes['parentTaskData']) {
    //   this.showChildTable = new Map();
    // }

    if (changes['loggedInUserData']) {
      this.loggedInUserData = this.loggedInUserData;
    }

    if (changes['parentAndAllTask']) {

      if (this.parentAndAllTask && this.parentAndAllTask.parentTasks) {
        this.parentAndAllTask.parentTasks?.forEach(task => {
          //// console.log(this.parentAndAllTask.childTasks);


          task.childTask = [];
          task.childTask.push(task);
          let childData = this.parentAndAllTask.childTasks;
          //// console.log(childData);

          childData.forEach(child => {
            //// console.log(child);

            if (task.taskId == child.taskParent) {
              task.childTask.push(child);
            }
          })
        });
      }
      //// console.log(this.parentAndAllTask);

      // this.emptyTask = this.emptyTask;

      //toggle exapansion row 
      let toggleIds = new Set<any>();
      const data = sessionStorage.getItem('toggle');
      if (data) {
        toggleIds = JSON.parse(data);
        this.toggledTasksIds = new Set(toggleIds);
      }
    }

    if (changes['emptyTask']) {
      //// console.log(this.emptyTask);

      this.emptyTask = this.emptyTask;
    }
  }

  // for opening/ closing child table for task
  toggleChildTable(task: Task): void {

    // Checking parent task is toggled or not (maintained set for expanded parent task i.e. toggledTasksIds)
    if (!this.toggledTasksIds.has(task.taskId)) {

      // if logged is user is owner of task then he can see all child tasks
      if (task.taskCreatedBy == this.employeeId) {
        this.onClickChild(task);
      }
      this.toggledTasksIds.add(task.taskId);

    } else {
      this.toggledTasksIds.delete(task.taskId);
    }

    // converting set into string
    const stringToggledIds = Array.from(this.toggledTasksIds);

    // setting toggled tasks ids in session strorage
    sessionStorage.setItem("toggle", JSON.stringify(stringToggledIds));

  }


  // for getting child task using parent id
  private onClickChild(task: Task) {

    // if (this.parentTaskData[this.parentTaskData.indexOf(task)].childTask) {
    //   //// console.log("exist");

    // } else {
    //// console.log(task);

    // //// console.log("exist");
    // calling function to get child task using parent id

    this.taskService.getChildTaskByParentId(task.taskId).subscribe(
      (response) => {
        //// console.log(this.parentAndAllTask);
        // const uniqueKeys = new Set(this.parentAndAllTask.childTasks.map(item => item.taskId));

        // // this.parentAndAllTask.childTasks.push(...response);
        // response.forEach(item => {
        //   if (!uniqueKeys.has(item.taskId)) {
        //     this.parentAndAllTask.childTasks.push(item);
        //     uniqueKeys.add(item.taskId);
        //   }
        // });
        // //// console.log(this.parentAndAllTask);

        const uniqueKeys = new Set(this.parentAndAllTask.childTasks.map(item => item.taskId));

        // this.parentAndAllTask.childTasks.push(...response);
        response.forEach(item => {
          if (!uniqueKeys.has(item.taskId)) {
            this.parentAndAllTask.childTasks.push(item);
            task.childTask.push(item);
            uniqueKeys.add(item.taskId);
          }
        });
        //// console.log(task);

        //// console.log(this.parentAndAllTask);

        // this.childData = [];
        // this.childData = response;

        // // setting child data to parent task
        // this.parentTaskData[this.parentTaskData.indexOf(task)].childTask = this.childData;


      },
      (error) => {
        //// console.log("Failed to load child task!");
      }
    );
    // }     
  }

  parentTaskStatus: any;

  // for create and Update task
  onClickCreateTask(task: Task, operation: string, event: Event) {
    event.stopPropagation();

    // for getting update task status
    if (task != null && task.taskId != undefined) {
      this.taskService.getTaskByTaskId(task.taskId).subscribe(
        response => {
          this.parentTaskStatus = this.allStatus.find(s => s.statusId == response.taskStatus);
        }
      );
    }
    // //// console.log(taskData);

    this.emptyTask = {} as Task;
    this.updateScreen = false;
    this.parentTask = {} as Task;

    // console.log(task);
    //// console.log(operation);

    if (operation == 'ADD') {

      // console.log(task);

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
      // console.log(task);

      if (task.taskParent > 0) {
        this.taskService.getTaskByTaskId(task.taskParent).subscribe(
          (response) => {
            // on success 
            this.parentTask = response;
            // // console.log(this.parentTask);
          }
        );
      }

      // get task and internal/external task data by task id
      this.taskService.getTaskByTaskId(task.taskId).subscribe(
        (response) => {
          // on success 
          task = response;
          // // console.log(task);
          this.emptyTask = Object.assign({}, task);
        }
      );

      this.emptyTask = Object.assign({}, task);
      // // console.log(this.emptyTask);

    }
  }

  // operation after creating task
  afterCreateTask() {
    location.reload();
  }



  // for getting all status
  private getAllStatus() {
    this.statusService.getAllStatus().subscribe(
      (response) => {

        // store all status
        this.allStatus = response;
        //// console.log(this.allStatus);

      },
      (error) => {
        //// console.log("Failed to get all status");
      }
    );
  }

  onTriggered(data: Task) {
    // alert();
  }
}
