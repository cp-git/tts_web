import { Component, OnInit } from '@angular/core';
import { Taxtype } from '../../classes/taxtype';
import { TextypeService } from '../../services/textype.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addtaxtype',
  templateUrl: './addtaxtype.component.html',
  styleUrls: ['./addtaxtype.component.css']
})
export class AddtaxtypeComponent implements OnInit {


  taxType!: Taxtype;
  companyId: any;
  isSubmited: boolean = false;
  constructor(
    private taxTypeService: TextypeService,
    private location: Location,
    private dialogueBoxService: DialogueBoxService,
    private route: Router
  ) {
    this.taxType = {} as Taxtype;
    this.companyId = sessionStorage.getItem('companyId')

  }
  ngOnInit(): void {

  }

  addTaxType(taxType: Taxtype) {

    taxType.companyId = this.companyId;
    // alert(JSON.stringify(taxType))
    this.taxTypeService.addTaxType(taxType).subscribe(
      (response: Taxtype) => {
        this.isSubmited = true;
        this.dialogueBoxService.open(' Tax Type created successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });

      },
      (error) => {
        console.log("Failed to get all");
        this.dialogueBoxService.open('Tax Type creation Failed', 'warning');

      }
    )
  }

  navigateToPortal() {
    this.route.navigate(['/status']);
  }
}