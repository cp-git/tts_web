import { Component } from '@angular/core';
import { Taxtype } from '../../classes/taxtype';
import { TextypeService } from '../../services/textype.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-taxtype',
  templateUrl: './taxtype.component.html',
  styleUrls: ['./taxtype.component.css']
})
export class TaxtypeComponent {


  companyId: any;
  taxTypes: Taxtype[] = [];
  constructor(
    private taxTypeService: TextypeService,
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

    this.taxTypeService.getAllTaxTypeByCompanyId(companyId).subscribe(
      (response) => {

        this.taxTypes = response;

      },
      (erro) => {
        console.log("fail to fetch taxtype");
      }
    )
  }

  navigateToAddTaxType() {
    this.route.navigate(['/addTaxType']);
  }


  // Redirect to the 'update' route and pass the country object as a parameter
  redirectToUpdate(taxType: Taxtype) {
    this.route.navigate(['/updateTaxType'], { state: { taxType } });
  }


  onDeleteTaxType(taxTypeId: number) {
    this.dialogueBoxService.open('Are you sure you want to delete this taxtype? ', 'decision').then((response) => {
      if (response) {
        this.taxTypeService.deleteTaxType(taxTypeId).subscribe(
          () => {
            this.dialogueBoxService.open('Tax Type deleted successfully', 'information');
            console.log('taxtype deleted successfully'); // Log success
            window.location.reload();

          },
          (error) => {
            this.dialogueBoxService.open('Error deleting taxtype', 'warning');
            console.error('Error deleting taxtype: ', error); // Handle errors when deleting
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

}
