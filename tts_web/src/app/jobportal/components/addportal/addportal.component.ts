import { Component, OnInit } from '@angular/core';
import { Jobportal } from '../../classes/jobportal';
import { JobportalService } from '../../services/jobportal.service';
import { Location } from '@angular/common';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addportal',
  templateUrl: './addportal.component.html',
  styleUrls: ['./addportal.component.css']
})
export class AddportalComponent implements OnInit {


  portal!: Jobportal;
  companyId: any;
  constructor(
    private jobPortalService: JobportalService,
    private location: Location,
    private dialogueBoxService: DialogueBoxService,
    private route: Router
  ) {
    this.portal = {} as Jobportal;
    this.companyId = sessionStorage.getItem('companyId')

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addJobPortal(portal: Jobportal) {

    portal.companyId = this.companyId;
    alert(JSON.stringify(portal))
    this.jobPortalService.addJobPortal(portal).subscribe(
      (response: Jobportal) => {

        this.dialogueBoxService.open(' job portal created successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });

      },
      (error) => {
        console.log("Failed to get all");
        this.dialogueBoxService.open('portal creation Failed', 'warning');

      }
    )
  }

  navigateToPortal() {
    this.route.navigate(['/status']);
  }

}
