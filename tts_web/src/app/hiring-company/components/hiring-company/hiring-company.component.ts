import { Component, OnInit } from '@angular/core';
import { HiringCompany } from '../../class/hiring-company';
import { Router } from '@angular/router';
import { HiringCompanyService } from '../../services/hiring-company.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';

@Component({
  selector: 'app-hiring-company',
  templateUrl: './hiring-company.component.html',
  styleUrls: ['./hiring-company.component.css'],
})
export class HiringCompanyComponent implements OnInit {
  allHiringCompany: HiringCompany[] = [];

  companyId: any;
  // HiringCompanyId: any;

  constructor(
    private router: Router,
    private dialogueBoxService: DialogueBoxService,
    private hiringCompanyService: HiringCompanyService
  ) {
    // this.HiringCompanyId = sessionStorage.getItem('HiringCompanyId');
    this.companyId = sessionStorage.getItem('companyId');
  }

  ngOnInit(): void {
    this.loadAllHiringCompanyByCompanyId(this.companyId);
  }

  // fetching all hiring company details by company id
  loadAllHiringCompanyByCompanyId(companyId: number) {
    this.hiringCompanyService
      .getAllHiringCompanyByCompanyId(companyId)
      .subscribe((response) => {
        this.allHiringCompany = response;
      });
  }

  // Method to navigate to the CreateHiringCompanyComponent when the "Add" button is clicked
  navigateToCreateHiringCompany() {
    this.router.navigate(['/addhc']);
  }

  // Method to navigate to the UpdateHiringCompanyComponent when the "Update" button is clicked
  navigateToUpdateHiringCompany(hiringCompany: HiringCompany) {
    this.router.navigate(['/updatehc'], { state: { hiringCompany } });
  }

  // Method to delete an HiringCompany when the "Delete" button is clicked for a specific HiringCompany
  deleteHiringCompany(hiringCompany: HiringCompany) {
    this.dialogueBoxService
      .open('Are you sure to delete this hiring company? ', 'decision')
      .then((response) => {
        if (response) {
          console.log('User clicked OK');
          // Do something if the user clicked OK
          // Subscribe to the observable returned by the HiringCompanyService to delete the Hiring Company
          this.hiringCompanyService
            .deleteByHiringCompanyId(hiringCompany.hiringCompanyId)
            .subscribe(
              (response) => {
                console.log('Hiring company deleted successfully:', response); // Log success message on successful deletion
                this.dialogueBoxService.open(
                  'Hiring Company deleted successfully',
                  'information'
                );
                // After deleting the Hiring Company, refresh the Hiring Company list to remove the deleted Hiring Company from the table
                //this.getAllHiringCompanys();
                this.ngOnInit();
              },
              (error) => {
                console.error('Failed to delete Hiring company:', error); // Handle any errors that occur during the request
                this.dialogueBoxService.open(
                  'Failed to delete Hiring company',
                  'warning'
                );
              }
            );
        } else {
          console.log('User clicked Cancel');
          // Do something if the user clicked Cancel
        }
      });
  }
}
