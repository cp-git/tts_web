import { Component, Input, OnInit } from '@angular/core';
import { HiringCompany } from '../../class/hiring-company';
import { HiringCompanyService } from '../../services/hiring-company.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Location } from '@angular/common';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { JoblocationService } from 'src/app/joblocation/services/joblocation.service';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { JobportalService } from 'src/app/jobportal/services/jobportal.service';
@Component({
  selector: 'app-create-hiring-company',
  templateUrl: './create-hiring-company.component.html',
  styleUrls: ['./create-hiring-company.component.css'],
})
export class CreateHiringCompanyComponent implements OnInit {
  allJobLocations: Joblocation[] = [];
  allJobPortals: Jobportal[] = [];


  filteredLocations: Joblocation[] = [];
  filteredJobPortals: Jobportal[] = [];

  hiringCompany: HiringCompany = {} as HiringCompany;
  todayDate: string;

  companyId: any;
  employeeId: any;

  selectedJobSubmissionMethod: Jobportal = new Jobportal();

  constructor(
    private hiringCompanyService: HiringCompanyService,
    private dialogueBoxService: DialogueBoxService,
    private location: Location,
    private jobLocationService: JoblocationService,
    private jobPortalService: JobportalService
  ) {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');

    this.initialization();
  }

  initialization() {
    this.hiringCompany.companyId = this.companyId;
  }

  ngOnInit(): void {
    this.getJobLocationsByCompanyId(this.companyId);
    this.getJobPortalsByCompanyId(this.companyId);
  }

  // fetching job location using company Id
  getJobLocationsByCompanyId(companyId: number) {
    this.jobLocationService
      .getAllJobLocationByCompanyId(companyId)
      .subscribe((response) => {

        for(let v=0;v<=response.length;v++){
          //console.log(response[v]);

          if(response[v].locationActive==true){
            console.log(response[v]);
            this.filteredLocations.push(response[v])
            
          }
          
        }
        this.allJobLocations = response;
        console.log(this.allJobLocations);
      });
  }

  // fetching job location using company Id
  getJobPortalsByCompanyId(companyId: number) {
    this.jobPortalService
      .getAllJobPortalsByCompanyId(companyId)
      .subscribe((response) => {

        for(let v=0;v<=response.length;v++){
          //console.log(response[v]);

          if(response[v].jobActive==true){
            console.log(response[v]);
            this.filteredJobPortals.push(response[v])
            
          }
          
        }

        this.allJobPortals = response;
        console.log(this.allJobLocations);
      });
  }

  // Function to add a new HiringCompany
  addHiringCompany(hiringCompany: HiringCompany) {
    this.hiringCompanyService.addHiringCompany(hiringCompany).subscribe(
      (data) => {
        console.log('Hiring company added successfully:', data);
        this.dialogueBoxService
          .open('Hiring company added successfully', 'information')
          .then((response) => {
            if (response) {
              this.location.back(); // Refresh the page
            }
          });
      },
      (error) => {
        console.error('Failed to add Hiring company:', error);
        this.dialogueBoxService.open(
          'Failed to add Hiring company. Already Exists',
          'warning'
        );
      }
    );
  }

  // When we change we are getting id but we want name of job portal for other method
  onChangeSubmissionMethod() {
    const portalData = this.allJobPortals.find(
      (portal) => portal.portalId == this.hiringCompany.jobSubmissionMethod
    );

    if (portalData) {
      this.selectedJobSubmissionMethod = portalData;
    }
  }
}
