import { Component } from '@angular/core';
import { BenchCandidateService } from '../../services/bench-candidate.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
import { Visa } from 'src/app/visa/class/visa';
import { BenchCandidate } from '../../class/bench-candidate';
import { Location } from '@angular/common';
import { TextypeService } from 'src/app/taxtype/services/textype.service';
import { VisaService } from 'src/app/visa/services/visa.service';
@Component({
  selector: 'app-create-bench-candidate',
  templateUrl: './create-bench-candidate.component.html',
  styleUrls: ['./create-bench-candidate.component.css'],
})
export class CreateBenchCandidateComponent {
  allTaxTypes: Taxtype[] = [];
  allVisas: Visa[] = [];

  filteredVisas: Visa[] = [];

  filteredTaxTypes: Taxtype[] = [];

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
    this.getTaxTypesByCompanyId(this.companyId);
    this.getVisasByCompanyId(this.companyId);
  }

  // fetching tax type using candidate Id
  getTaxTypesByCompanyId(candidateId: number) {
    this.taxTypeService
      .getAllTaxTypeByCompanyId(candidateId)
      .subscribe((response) => {

        for(let v=0;v<=response.length;v++){
          //console.log(response[v]);

          if(response[v].taxActive==true){
            console.log(response[v]);
            this.filteredTaxTypes.push(response[v])
            
          }
          
        }
        this.allTaxTypes = response;
      });
  }

  // fetching visas using candidate Id
  getVisasByCompanyId(candidateId: number) {
    this.visaService
      .getAllVisasByCompanyId(candidateId)
      .subscribe((response) => {
       // console.log(response);
        for(let v=0;v<=response.length;v++){
          //console.log(response[v]);

          if(response[v].visaActive==true){
            console.log(response[v]);
            this.filteredVisas.push(response[v])
            
          }
          
        }
        
        this.allVisas = response;
      });
  }

  // Function to add a new BenchCandidate
  addBenchCandidate(benchCandidate: BenchCandidate) {
    this.benchCandidateService.addBenchCandidate(benchCandidate).subscribe(
      (data) => {
        console.log('Bench candidate added successfully:', data);
        this.dialogueBoxService
          .open('Bench candidate added successfully', 'information')
          .then((response) => {
            if (response) {
              this.location.back(); // Refresh the page
            }
          });
      },
      (error) => {
        console.error(error);
        const errorMessage =
          error && error.error ? error.error : 'Failed to add Bench candidate.';
        this.dialogueBoxService.open(errorMessage, 'warning');
      }
    );
  }
}
