import { Component } from '@angular/core';
import { Visa } from '../../class/visa';
import { VisaService } from '../../services/visa.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.css']
})
export class VisaComponent {


  companyId: any;
  visas: Visa[] = [];
  constructor(
    private visaService: VisaService,
    private dialogueBoxService: DialogueBoxService,
    private route: Router,
    private location: Location
  ) {
    this.companyId = sessionStorage.getItem('companyId');
  }

  ngOnInit() {
    this.getVisasByCompanyId(this.companyId);
  }

  getVisasByCompanyId(companyId: any) {

    this.visaService.getAllVisasByCompanyId(companyId).subscribe(
      (response) => {
        this.visas = response;
      },
      (erro) => {
        console.log("fail to fetch visa");
      }
    )
  }

  navigateToAddVisa() {
    this.route.navigate(['/addVisa']);
  }


  // Redirect to the 'update' route and pass the country object as a parameter
  redirectToUpdate(visa: Visa) {
    this.route.navigate(['/updateVisa'], { state: { visa } });
  }


  onDeleteStatus(visaId: number) {
    this.dialogueBoxService.open('Are you sure you want to delete this visa? ', 'decision').then((response) => {
      if (response) {
        this.visaService.deleteVisa(visaId).subscribe(
          () => {
            this.dialogueBoxService.open('Visa deleted successfully', 'information');
            console.log('visa deleted successfully'); // Log success
            window.location.reload()

          },
          (error) => {
            this.dialogueBoxService.open('Error deleting visa', 'warning');
            console.error('Error deleting visa: ', error); // Handle errors when deleting
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

}
