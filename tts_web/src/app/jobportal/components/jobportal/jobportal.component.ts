import { Component, OnInit } from '@angular/core';
import { JobportalService } from '../../services/jobportal.service';
import { Jobportal } from '../../classes/jobportal';
import { Router } from '@angular/router';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-jobportal',
  templateUrl: './jobportal.component.html',
  styleUrls: ['./jobportal.component.css']
})
export class JobportalComponent implements OnInit {


  companyId: any;
  jobPortals: Jobportal[] = [];
  constructor(
    private jobPortalService: JobportalService,
    private dialogueBoxService: DialogueBoxService,
    private route: Router,
    private location: Location
  ) {
    this.companyId = sessionStorage.getItem('companyId');
  }

  ngOnInit() {
    this.getJobPortalsByCompanyId(this.companyId);
  }

  getJobPortalsByCompanyId(companyId: any) {

    this.jobPortalService.getAllJobPortalsByCompanyId(companyId).subscribe(
      (response) => {

        this.jobPortals = response;
        // alert(JSON.stringify(this.jobPortals))
      },
      (erro) => {
        console.log("fail to fetch portals");
      }
    )
  }

  navigateToAddPortal() {
    this.route.navigate(['/addPortal']);
  }


  // Redirect to the 'update' route and pass the country object as a parameter
  redirectToUpdate(portal: Jobportal) {
    this.route.navigate(['/updatePortal'], { state: { portal } });
  }


  onDeleteStatus(portalId: number) {
    this.dialogueBoxService.open('Are you sure you want to delete this portal? ', 'decision').then((response) => {
      if (response) {
        this.jobPortalService.deleteJobPortal(portalId).subscribe(
          () => {
            this.dialogueBoxService.open('Portal deleted successfully', 'information');
            console.log('portal deleted successfully'); // Log success
            window.location.reload()

          },
          (error) => {
            this.dialogueBoxService.open('Error deleting portal', 'warning');
            console.error('Error deleting portal: ', error); // Handle errors when deleting
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

}
