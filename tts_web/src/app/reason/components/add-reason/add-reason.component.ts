import { Component } from '@angular/core';
import { ReasonService } from '../../services/reason.service';
import { Reason } from '../../class/reason';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';

@Component({
  selector: 'app-add-reason',
  templateUrl: './add-reason.component.html',
  styleUrls: ['./add-reason.component.css']
})
export class AddReasonComponent {
  reasonText: string = ''; // Declare a variable to hold the text of the new reason
  currentDateTime: string = new Date().toLocaleString(); // Get the current date and time as a string
  employeeId: any;
  companyId: any;
  constructor(private reasonService: ReasonService, private dialogueBoxService: DialogueBoxService) {
    this.employeeId = localStorage.getItem("employeeId");
    this.companyId = localStorage.getItem("companyId");
  }


  saveReason() {
    if (this.reasonText) { // Check if there's actual reason text to save
      const newReason: Reason = { // Create a new Reason object with the provided properties
        id: 0,
        taskId: 5,
        employeeId: 194,
        chgDateTime: new Date(), // Set the change date and time to the current moment
        reasonText: this.reasonText,
        statusId: 1,
        assignedTo: 191,
      };

      this.reasonService.createReason(newReason).subscribe(
        (response) => {

          this.dialogueBoxService.open('Reason saved successfully!', 'information');
        },
        (error) => {
          this.dialogueBoxService.open('Error saving reason', 'warning');
        }
      );
    }
  }

  cancel() {
    const modal = document.getElementById('reasonModal'); // Get the element with ID 'reasonModal'
    if (modal) {
      modal.style.display = 'none'; // Hide the modal by changing its CSS display property
    }
  }

  showReasonModal() {
    const modal = document.getElementById('reasonModal'); // Get the element with ID 'reasonModal'
    if (modal) {
      modal.style.display = 'block'; // Show the modal by changing its CSS display property
    }
  }
}
