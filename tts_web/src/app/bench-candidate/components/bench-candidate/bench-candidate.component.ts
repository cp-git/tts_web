import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BenchCandidateService } from '../../services/bench-candidate.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { TextypeService } from 'src/app/taxtype/services/textype.service';
import { VisaService } from 'src/app/visa/services/visa.service';
import { BenchCandidate } from '../../class/bench-candidate';
import { Visa } from 'src/app/visa/class/visa';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';

@Component({
  selector: 'app-bench-candidate',
  templateUrl: './bench-candidate.component.html',
  styleUrls: ['./bench-candidate.component.css'],
})
export class BenchCandidateComponent {
  allBenchCandidate: BenchCandidate[] = [];
  allTaxTypes: Taxtype[] = [];
  allVisas: Visa[] = [];

  companyId: any;
  // BenchCandidateId: any;

  constructor(
    private router: Router,
    private benchCandidateService: BenchCandidateService,
    private dialogueBoxService: DialogueBoxService,
    private taxTypeService: TextypeService,
    private visaService: VisaService
  ) {
    // this.BenchCandidateId = sessionStorage.getItem('BenchCandidateId');
    this.companyId = sessionStorage.getItem('companyId');
  }

  ngOnInit(): void {
    this.loadAllBenchCandidateByCompanyId(this.companyId);
    this.getTaxTypesByCompanyId(this.companyId);
    this.getVisasByCompanyId(this.companyId);
  }

  // fetching all bench candidate details by company id
  loadAllBenchCandidateByCompanyId(companyId: number) {
    this.benchCandidateService
      .getAllBenchCandidateByCompanyId(companyId)
      .subscribe((response) => {
        this.allBenchCandidate = response;
      });
  }

  // Method to navigate to the CreateBenchCandidateComponent when the "Add" button is clicked
  navigateToCreateBenchCandidate() {
    this.router.navigate(['/addbenchcand']);
  }

  // Method to navigate to the UpdateBenchCandidateComponent when the "Update" button is clicked
  navigateToUpdateBenchCandidate(benchCandidate: BenchCandidate) {
    this.router.navigate(['/updatebenchcand'], { state: { benchCandidate } });
  }

  // Method to delete an BenchCandidate when the "Delete" button is clicked for a specific BenchCandidate
  deleteBenchCandidate(benchCandidate: BenchCandidate) {
    this.dialogueBoxService
      .open('Are you sure to delete this bench candidate? ', 'decision')
      .then((response) => {
        if (response) {
          console.log('User clicked OK');
          // Do something if the user clicked OK
          // Subscribe to the observable returned by the BenchCandidateService to delete the Bench candidate
          this.benchCandidateService
            .deleteByBenchCandidateId(benchCandidate.benchCandidateId)
            .subscribe(
              (response) => {
                console.log('Bench candidate deleted successfully:', response); // Log success message on successful deletion
                this.dialogueBoxService.open(
                  'Bench candidate deleted successfully',
                  'information'
                );
                // After deleting the Bench candidate, refresh the Bench candidate list to remove the deleted Bench candidate from the table
                //this.getAllBenchCandidates();
                this.ngOnInit();
              },
              (error) => {
                console.error('Failed to delete Bench candidate:', error); // Handle any errors that occur during the request
                this.dialogueBoxService.open(
                  'Failed to delete Bench candidate',
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

  // fetching tax type using candidate Id
  getTaxTypesByCompanyId(candidateId: number) {
    this.taxTypeService
      .getAllTaxTypeByCompanyId(candidateId)
      .subscribe((response) => {
        this.allTaxTypes = response;
      });
  }

  // fetching visas using candidate Id
  getVisasByCompanyId(candidateId: number) {
    this.visaService
      .getAllVisasByCompanyId(candidateId)
      .subscribe((response) => {
        this.allVisas = response;
      });
  }

  // get tax type name by id
  getTaxTypeNameById(id: number) {
    return this.allTaxTypes.find((taxType) => taxType.taxTypeId == id)
      ?.taxTypeName;
  }

  // get visa type name by id
  getVisaTypeNameById(id: number) {
    return this.allVisas.find((visa) => visa.visaId == id)?.visaType;
  }
}
