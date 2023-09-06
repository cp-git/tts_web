import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status.service';
import { Status } from '../../class/status';
import { Router } from '@angular/router';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statuses: Status[];

  constructor(private statusService: StatusService, private route: Router, private dialogueBoxService: DialogueBoxService) {
    this.statuses = [];
  }

  ngOnInit(): void {
    this.getAllStatus();
  }


  getAllStatus() {
    this.statusService.getAllStatus().subscribe(
      (data: Status[]) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error fetching status records: ', error);
      }
    );
  }



  // Function to handle deleting a status
  onDeleteStatus(statusId: number) {
    this.dialogueBoxService.open('Are you sure you want to delete this Status ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        this.statusService.deleteStatus(statusId).subscribe(
          () => {
            this.dialogueBoxService.open('Status deleted successfully', 'information');
            console.log('Status deleted successfully'); // Log success
            this.getAllStatus(); // Refresh the status list
          },
          (error) => {
            this.dialogueBoxService.open('Error deleting status', 'warning');
            console.error('Error deleting status: ', error); // Handle errors when deleting
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

  // Redirect to the 'update' route and pass the country object as a parameter
  redirectToUpdate(status: Status) {
    this.route.navigate(['/updateStatus'], { state: { status } });
  }
}
