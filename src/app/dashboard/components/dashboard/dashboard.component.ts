import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  tableData: any[] = [
    { TaskName: 'Mark', Description: 'Otto', Owner: '@mdo', AssignedTo: 'Otto', ETA: '@mdo', Status: 'Otto', Action: 'Action 1' },
    { TaskName: 'Jacob', Description: 'Thornton', Owner: '@fat', AssignedTo: 'Otto', ETA: '@mdo', Status: 'Otto', Action: 'Action 2' },
    { TaskName: 'Larry the Bird', Description: '@twitter', Owner: 'Otto', AssignedTo: '@mdo', ETA: '@mdo', Status: 'Otto', Action: 'Action 3' },
    // Add more data entries as needed
  ];

  showChildTable: boolean[] = Array(this.tableData.length).fill(false);

  toggleChildTable(index: number): void {
    this.showChildTable[index] = !this.showChildTable[index];
  }
}
