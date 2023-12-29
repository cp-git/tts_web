import { Component } from '@angular/core';
import { Jobportal } from '../../classes/jobportal';
import { JobportalService } from '../../services/jobportal.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-updateportal',
  templateUrl: './updateportal.component.html',
  styleUrls: ['./updateportal.component.css']
})
export class UpdateportalComponent {

  portal!: Jobportal;

  constructor(
    private jobPortalServcice: JobportalService,
    private dialogueBoxService: DialogueBoxService,
    private location: Location,
    private route: Router
  ) {
    this.portal = {} as Jobportal;
    this.portal = history.state.portal;
  }

  updateJobPortal(portal: Jobportal) {
    // alert(JSON.stringify(portal))
    this.jobPortalServcice.updateJobPortal(portal.portalId, portal).subscribe(
      (response: Jobportal) => {

        this.dialogueBoxService.open('Portal updated successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });
      },
      (error) => {
        this.dialogueBoxService.open('Failed to update portal', 'warning');
      }
    )

  }
  navigateToPortal() {
    this.route.navigate(['/status']);
  }

}
