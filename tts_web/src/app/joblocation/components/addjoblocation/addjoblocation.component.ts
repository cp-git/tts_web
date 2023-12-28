import { Component, OnInit } from '@angular/core';
import { Joblocation } from '../../classes/joblocation';
import { JoblocationService } from '../../services/joblocation.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addjoblocation',
  templateUrl: './addjoblocation.component.html',
  styleUrls: ['./addjoblocation.component.css']
})
export class AddjoblocationComponent implements OnInit {

  jobLocation!: Joblocation;
  companyId: any;
  constructor(
    private jobLocationSercvice: JoblocationService,
    private location: Location,
    private dialogueBoxService: DialogueBoxService,
    private route: Router
  ) {
    this.jobLocation = {} as Joblocation;
    this.companyId = sessionStorage.getItem('companyId')

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addJobLocation(location: Joblocation) {

    location.companyId = this.companyId;
    // alert(JSON.stringify(location))
    this.jobLocationSercvice.addJobLocation(location).subscribe(
      (response: Joblocation) => {

        this.dialogueBoxService.open(' job location created successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });

      },
      (error) => {
        console.log("Failed to get all");
        this.dialogueBoxService.open('location creation Failed', 'warning');

      }
    )
  }

  navigateToPortal() {
    this.route.navigate(['/status']);
  }

}
