import { Component, EventEmitter, Output, OnInit } from '@angular/core';
@Component({
  selector: 'app-status-buttons',
  templateUrl: './status-buttons.component.html',
  styleUrls: ['./status-buttons.component.css']
})
export class StatusButtonsComponent implements OnInit {

  @Output() onChangeFilter: EventEmitter<any> = new EventEmitter();

  selectedTask: any;
  selectedCreatedBy: any;
  selectedAssignedTo: any;

  employeeId: any;
  companyId: any;

  constructor() {
    this.employeeId = sessionStorage.getItem('employeeId');
    console.log("employeeID " + this.employeeId);

    this.companyId = sessionStorage.getItem('companyId');


  }

  ngOnInit() {
    // Initialize selected values from SessionStorage or use default values
    this.selectedTask = sessionStorage.getItem('selectedTask') || 'ALL';
    this.selectedCreatedBy = sessionStorage.getItem('selectedCreatedBy') || this.employeeId;
    this.selectedAssignedTo = sessionStorage.getItem('selectedAssignedTo') || this.employeeId;
    // When the component initializes, emit the initial filter values
    this.emitFilter();
  }

  // on change of filters
  onChangeFilterTask() {
    // Store selected values in SessionStorage
    sessionStorage.setItem('selectedTask', this.selectedTask);
    sessionStorage.setItem('selectedCreatedBy', this.selectedCreatedBy);
    sessionStorage.setItem('selectedAssignedTo', this.selectedAssignedTo);

    // Emit the filter values
    this.emitFilter();
  }

  // Function to emit the filter values
  emitFilter() {
    const data = {
      status: this.selectedTask,
      createdBy: this.selectedCreatedBy,
      assignedTo: this.selectedAssignedTo,
      companyId: this.companyId,
      parentId: 0
    }
    console.log(data);
    // Send data to the parent for operation (getting data using an API call)
    this.onChangeFilter.emit(data);
  }
}
