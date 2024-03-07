import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Employee } from 'src/app/employee/class/employee';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent implements OnInit {

  @Input() employees: Employee[] = [];
  @Output() onChangeEmployeeFilter: EventEmitter<any> = new EventEmitter<any>;

  selectedEmployees: any[] = [];
  employeeOptions: any[] = [];

  employeeId: any;
  companyId: any;

  // Define dropdown settings for multiselect
  dropdownSettings: IDropdownSettings = {};

  constructor() {
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');
  }

  ngOnInit(): void {

    // Initialize selected values from SessionStorage or use default values
    const selectedEmployeesJson = sessionStorage.getItem('selectedEmployees');
    this.selectedEmployees = selectedEmployeesJson ? JSON.parse(selectedEmployeesJson) : []; // Set "All" by default

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

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['employees']) {
      console.log(this.employees);
      this.employeeOptions = this.employees.map((emp) => ({
        id: emp.employeeId,
        itemName: emp.employeeId == this.employeeId ? emp.firstName : emp.firstName,
      }));
    }
  }

  onChangeEmployee() {
    sessionStorage.setItem('selectedEmployees', JSON.stringify(this.selectedEmployees));
    this.emitFilter();
  }

  emitFilter() {
    // const data = {
    //   statuses: this.selectedEmployees
    // };
    //console.log(data);
    //console.log(this.selectedStatuses);

    this.onChangeEmployeeFilter.emit(this.selectedEmployees);
  }

}
