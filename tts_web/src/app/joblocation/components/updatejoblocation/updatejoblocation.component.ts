import { Component, OnInit } from '@angular/core';
import { Joblocation } from '../../classes/joblocation';
import { JoblocationService } from '../../services/joblocation.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-updatejoblocation',
  templateUrl: './updatejoblocation.component.html',
  styleUrls: ['./updatejoblocation.component.css']
})
export class UpdatejoblocationComponent implements OnInit {
  jobLocation!: Joblocation;

  constructor(
    private jobLocationService: JoblocationService,
    private dialogueBoxService: DialogueBoxService,
    private location: Location,
    private route: Router
  ) {
    this.jobLocation = {} as Joblocation;
    this.jobLocation = history.state.jobLocation;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  updateJobLocation(location: Joblocation) {
    alert(JSON.stringify(location))
    this.jobLocationService.updateJobLocation(location.locationId, location).subscribe(
      (response: Joblocation) => {

        this.dialogueBoxService.open('location updated successfully', 'information').then((response) => {
          if (response) {
            this.location.back();
          }
        });
      },
      (error) => {
        this.dialogueBoxService.open('Failed to update location', 'warning');
      }
    )

  }
  navigateToPortal() {
    this.route.navigate(['/status']);
  }
}
