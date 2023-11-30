import { Component, EventEmitter, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { StatusService } from 'src/app/status/services/status.service';

@Component({
  selector: 'app-status-dropdown',
  templateUrl: './status-dropdown.component.html',
  styleUrls: ['./status-dropdown.component.css']
})
export class StatusDropdownComponent {

  @Output() onChangeStatusFilter: EventEmitter<any> = new EventEmitter();

  selectedStatuses: any[] = [];
  statusOptions: any[] = [];

  employeeId: any
  companyId: any

  // Define dropdown settings for multiselect
  dropdownSettings: IDropdownSettings = {};

  constructor(private statusService: StatusService) {
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');
  }


  ngOnInit() {
    this.getStatuses();

    // Initialize selected values from SessionStorage or use default values
    const selectedStatusesJson = sessionStorage.getItem('selectedStatuses');
    this.selectedStatuses = selectedStatusesJson ? JSON.parse(selectedStatusesJson) : []; // Set "All" by default
    //console.log(this.selectedStatuses);
    
    // Configure dropdown settings
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'itemName',
      // selectAllText: 'ALL', 
      enableCheckAll: false,
      itemsShowLimit: 2,
      allowSearchFilter: false,
    };

    this.emitFilter();
  }


  getStatuses() {
    this.statusService.getStatusesByCompanyId(this.companyId).subscribe((statuses: any[]) => {
      this.statusOptions = statuses.map((status) => ({
        id: status.statusId,
        itemName: status.statusCode,
      }));
    });
  }

  onChangeFilterTask() {
    sessionStorage.setItem('selectedStatuses', JSON.stringify(this.selectedStatuses));
    this.emitFilter();
  }

  emitFilter() {
    const data = {
      statuses: this.selectedStatuses
    };
    //console.log(data);
    //console.log(this.selectedStatuses);
    
    this.onChangeStatusFilter.emit(this.selectedStatuses);
  }
}
