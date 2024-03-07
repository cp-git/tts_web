import { Component } from '@angular/core';
import { Visa } from '../../class/visa';
import { VisaService } from '../../services/visa.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addvisa',
  templateUrl: './addvisa.component.html',
  styleUrls: ['./addvisa.component.css']
})
export class AddvisaComponent {

  visa!: Visa;
  companyId: any;
  constructor(
    private visaService: VisaService,
    private location: Location,
    private dialogueBoxService: DialogueBoxService,
    private route: Router
  ) {
    this.visa = {} as Visa;
    this.companyId = sessionStorage.getItem('companyId')

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createVisa(visa: Visa) {

    visa.companyId = this.companyId;
    // alert(JSON.stringify(visa))
    this.visaService.addVisa(visa).subscribe(
      (response: Visa) => {

        this.dialogueBoxService.open(' Visa created successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });

      },
      (error) => {
        this.dialogueBoxService.open('visa creation Failed', 'warning');

      }
    )
  }

  navigateToPortal() {
    this.route.navigate(['/status']);
  }
}
