import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { StatusService } from 'src/app/status/services/status.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-status-buttons',
  templateUrl: './status-buttons.component.html',
  styleUrls: ['./status-buttons.component.css'],
})
export class StatusButtonsComponent implements OnInit {
  @Output() onChangeFilter: EventEmitter<any> = new EventEmitter();

  selectedCreatedBy: any;
  selectedAssignedTo: any;
  selectedStatuses: string[] = ['ALL']; // Default value with 'ALL' selected
  statusOptions: any[] = [];
  employeeId: any;
  companyId: any;

  // Define dropdown settings for multiselect
  dropdownSettings: IDropdownSettings = {};

  constructor(private statusService: StatusService) {
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');
  }

  ngOnInit() {
    this.statusService.getAllStatus().subscribe((statuses: any[]) => {
      this.statusOptions = statuses.map((status) => ({
        id: status.statusId,
        itemName: status.statusCode,
      }));
    });

    // Initialize selected values from SessionStorage or use default values
    const selectedStatusesJson = sessionStorage.getItem('selectedStatuses');
    this.selectedStatuses = selectedStatusesJson ? JSON.parse(selectedStatusesJson) : ['ALL']; // Set "All" by default
    this.selectedCreatedBy = sessionStorage.getItem('selectedCreatedBy') || this.employeeId;
    this.selectedAssignedTo = sessionStorage.getItem('selectedAssignedTo') || this.employeeId;

    // Configure dropdown settings
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'itemName',
      // selectAllText: 'ALL', 
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: false,
    };

    // Emit the initial filter data
    this.emitFilter();
  }

  onChangeFilterTask() {
    sessionStorage.setItem('selectedStatuses', JSON.stringify(this.selectedStatuses));
    sessionStorage.setItem('selectedCreatedBy', this.selectedCreatedBy);
    sessionStorage.setItem('selectedAssignedTo', this.selectedAssignedTo);
    this.emitFilter();
  }

  emitFilter() {
    const data = {
      statuses: this.selectedStatuses,
      createdBy: this.selectedCreatedBy,
      assignedTo: this.selectedAssignedTo,
      companyId: this.companyId,
      parentId: 0,
    };
    console.log(data);
    this.onChangeFilter.emit(data);
  }
}
