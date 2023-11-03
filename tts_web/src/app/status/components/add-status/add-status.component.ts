import { Component } from '@angular/core';
import { Status } from '../../class/status';
import { StatusService } from '../../services/status.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent {

  statuss!: Status[]; // An array to store the list of statuss fetched from the API

  status!: Status; // The current status object to be added
  empDataFromSession: any;
  empData: any;
  companyId!: number;
  //newStatus: Status;

  constructor(private statusService: StatusService, private dialogueBoxService: DialogueBoxService, private location: Location) {
    this.status = {} as Status;

  }

  ngOnInit(): void {

    this.empDataFromSession = sessionStorage.getItem('empData')
    this.empData = JSON.parse(this.empDataFromSession);
    if (this.empData) {
      this.companyId = this.empData.companyId;
    } else {
      console.error('companyId not found in session storage');
    }

    this.companyId = this.empData.companyId;
  }

  onSaveStatus(status: Status) {

    if (!this.companyId) {
      console.error('companyId not found in session storage');
      return;
    }
    // Assign the companyId to the status before sending it to the backend
    status.companyId = this.companyId;

    this.statusService.createStatus(status).subscribe(
      (data: Status) => {
        console.log('Status created successfully: ', data);

        this.dialogueBoxService.open('Status created successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });

      },
      (error) => {
        console.error('Error creating status: ', error);
        this.dialogueBoxService.open('Status creation Failed', 'warning');
      }
    );
  }
}