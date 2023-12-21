import { Component, OnInit } from '@angular/core';
import { Joblocation } from '../../classes/joblocation';
import { JoblocationService } from '../../services/joblocation.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-joblocation',
  templateUrl: './joblocation.component.html',
  styleUrls: ['./joblocation.component.css']
})
export class JoblocationComponent implements OnInit {
  companyId: any;
  jobLocations: Joblocation[] = [];
  constructor(
    private jobLocationService: JoblocationService,
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

    this.jobLocationService.getAllJobLocationByCompanyId(companyId).subscribe(
      (response) => {

        this.jobLocations = response;

      },
      (erro) => {
        console.log("fail to fetch location");
      }
    )
  }

  navigateToAdd() {
    this.route.navigate(['/addLocation']);
  }


  // Redirect to the 'update' route and pass the country object as a parameter
  redirectToUpdate(jobLocation: Joblocation) {
    this.route.navigate(['/updateLocation'], { state: { jobLocation } });
  }


  OnDeleteLocation(locationId: number) {
    this.dialogueBoxService.open('Are you sure you want to delete this portal? ', 'decision').then((response) => {
      if (response) {
        this.jobLocationService.deleteJobLocation(locationId).subscribe(
          () => {
            this.dialogueBoxService.open('Portal deleted successfully', 'information');
            console.log('portal deleted successfully'); // Log success
            window.location.reload()

          },
          (error) => {
            this.dialogueBoxService.open('Error deleting location', 'warning');
            console.error('Error deleting location: ', error); // Handle errors when deleting
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

}
