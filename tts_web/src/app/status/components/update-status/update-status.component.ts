import { Component } from '@angular/core';
import { Status } from '../../class/status';
import { StatusService } from '../../services/status.service';
import { Router } from '@angular/router';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent {
  // Define the status class and initialize the statuses array.
  status: Status;
  statuses!: Status[];

  empDataFromSession: any;
  empData: any;
  companyId!: number;

  constructor(private statusService: StatusService, private location: Location, private router: Router, private dialogueBoxService: DialogueBoxService) {
    this.status = {} as Status; //Initialize an empty object
  }

  ngOnInit(): void {
    // Access the status object passed from the list component through history state.
    this.status = history.state.status; // Get the status object passed from the previous component.

    // Get the companyId from session storage
    this.empDataFromSession = sessionStorage.getItem('empData')
    this.empData = JSON.parse(this.empDataFromSession);
    if (this.empData) {
      this.companyId = this.empData.companyId;
    } else {
      console.error('companyId not found in session storage');
    }
  }

  onSaveStatus(updatedStatus: Status) {
    if (!this.companyId) {
      console.error('companyId not found in session storage');
      return;
    }

    // Assign the companyId to the updatedStatus before sending it to the backend
    updatedStatus.companyId = this.companyId;

    this.statusService.updateStatus(updatedStatus.statusId, updatedStatus).subscribe(
      (data: Status) => {
        console.log('Status updated successfully: ', data);
        this.dialogueBoxService.open('Status updated successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });
      },

      (error) => {
        console.error('Error updating status: ', error);
        this.dialogueBoxService.open('Failed to update status', 'warning');
      }
    );
  }


}