import { Component } from '@angular/core';
import { Visa } from '../../class/visa';
import { VisaService } from '../../services/visa.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-updatevisa',
  templateUrl: './updatevisa.component.html',
  styleUrls: ['./updatevisa.component.css']
})
export class UpdatevisaComponent {

  visa!: Visa;

  constructor(
    private visaService: VisaService,
    private dialogueBoxService: DialogueBoxService,
    private location: Location,
    private route: Router
  ) {
    this.visa = {} as Visa;
    this.visa = history.state.visa;
  }

  updateVisa(visa: Visa) {
    alert(JSON.stringify(visa))
    this.visaService.updateVisa(visa.visaId, visa).subscribe(
      (response: Visa) => {

        this.dialogueBoxService.open('Visa updated successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });
      },
      (error) => {
        this.dialogueBoxService.open('Failed to update visa', 'warning');
      }
    )

  }
  navigateToPortal() {
    this.route.navigate(['/status']);
  }
}
