import { Component } from '@angular/core';
import { BenchCandidate } from '../../class/bench-candidate';
import { BenchCandidateService } from '../../services/bench-candidate.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { TextypeService } from 'src/app/taxtype/services/textype.service';
import { VisaService } from 'src/app/visa/services/visa.service';
import { Location } from '@angular/common';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
import { Visa } from 'src/app/visa/class/visa';
@Component({
  selector: 'app-update-bench-candidate',
  templateUrl: './update-bench-candidate.component.html',
  styleUrls: ['./update-bench-candidate.component.css'],
})
export class UpdateBenchCandidateComponent {
  allTaxTypes: Taxtype[] = [];
  allVisas: Visa[] = [];

  benchCandidate: BenchCandidate = {} as BenchCandidate;
  todayDate: string;

  companyId: any;
  employeeId: any;

  constructor(
    private benchCandidateService: BenchCandidateService,
    private dialogueBoxService: DialogueBoxService,
    private location: Location,
    private taxTypeService: TextypeService,
    private visaService: VisaService
  ) {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');

    this.initialization();
  }

  initialization() {
    this.benchCandidate.companyId = this.companyId;
  }

  ngOnInit(): void {
    this.benchCandidate = history.state.benchCandidate;
    this.getTaxTypesByCompanyId(this.companyId);
    this.getVisasByCompanyId(this.companyId);
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

  // Function to add a new BenchCandidate
  updateBenchCandidate(benchCandidate: BenchCandidate) {
    this.benchCandidateService
      .updateBenchCandidateByBenchCandidateCode(
        benchCandidate.benchCandidateId,
        benchCandidate
      )
      .subscribe(
        (data) => {
          console.log('Bench candidate updated successfully:', data);
          this.dialogueBoxService
            .open('Bench candidate updated successfully', 'information')
            .then((response) => {
              if (response) {
                this.location.back(); // Refresh the page
              }
            });
        },
        (error) => {
          console.error('Failed to update Bench candidate:', error);
          this.dialogueBoxService.open(
            'Failed to update Bench candidate. Already Exists',
            'warning'
          );
        }
      );
  }
}
