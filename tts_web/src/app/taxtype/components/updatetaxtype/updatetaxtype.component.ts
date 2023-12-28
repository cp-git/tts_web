import { Component } from '@angular/core';
import { Taxtype } from '../../classes/taxtype';
import { TextypeService } from '../../services/textype.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-updatetaxtype',
  templateUrl: './updatetaxtype.component.html',
  styleUrls: ['./updatetaxtype.component.css']
})
export class UpdatetaxtypeComponent {

  taxType!: Taxtype;

  constructor(
    private taxTypeService: TextypeService,
    private dialogueBoxService: DialogueBoxService,
    private location: Location,
    private route: Router
  ) {
    this.taxType = {} as Taxtype;
    this.taxType = history.state.taxType;
  }

  updateTaxType(taxType: Taxtype) {
    // alert(JSON.stringify(taxType))
    this.taxTypeService.updateTaxType(taxType.taxTypeId, taxType).subscribe(
      (response: Taxtype) => {

        this.dialogueBoxService.open('taxType updated successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });
      },
      (error) => {
        this.dialogueBoxService.open('Failed to update taxType', 'warning');
      }
    )

  }
  navigateToPortal() {
    this.route.navigate(['/status']);
  }
}
