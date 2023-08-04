import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-status-buttons',
  templateUrl: './status-buttons.component.html',
  styleUrls: ['./status-buttons.component.css']
})
export class StatusButtonsComponent {

  @Output() onChangeFilter: EventEmitter<any> = new EventEmitter();

  selectedTask: any;
  selectedCreatedBy: any;
  selectedAssignedTo: any;

  employeeId: any;
  companyId: any;

  constructor() {
    this.employeeId = localStorage.getItem('employeeId');
    console.log("employeeID " + this.employeeId);

    this.companyId = localStorage.getItem('companyId');

    this.selectedTask = 'ALL';
    this.selectedCreatedBy = 0;
    this.selectedAssignedTo = 0;

  }

  // on change of filters
  onChangeFilterTask() {

    const data = {
      status: this.selectedTask,
      createdBy: this.selectedCreatedBy,
      assignedTo: this.selectedAssignedTo,
      companyId: this.companyId,
      parentId: 0
    }
    console.log(data);
    // send data to parent for operation (getting data using api call)
    this.onChangeFilter.emit(data);
  }
}
