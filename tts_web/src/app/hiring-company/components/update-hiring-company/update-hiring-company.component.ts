import { Component } from '@angular/core';
import { HiringCompany } from '../../class/hiring-company';
import { HiringCompanyService } from '../../services/hiring-company.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { JoblocationService } from 'src/app/joblocation/services/joblocation.service';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { JobportalService } from 'src/app/jobportal/services/jobportal.service';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { Location } from '@angular/common';
@Component({
  selector: 'app-update-hiring-company',
  templateUrl: './update-hiring-company.component.html',
  styleUrls: ['./update-hiring-company.component.css'],
})
export class UpdateHiringCompanyComponent {
  allJobLocations: Joblocation[] = [];
  allJobPortals: Jobportal[] = [];

  hiringCompany: HiringCompany = {} as HiringCompany;
  todayDate: string;

  companyId: any;
  employeeId: any;

  selectedJobSubmissionMethod: Jobportal = new Jobportal();
  jobFulfillmentDate: string = '';

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
  }

  async initialization() {
    await this.getJobLocationsByCompanyId(this.companyId);
    await this.getJobPortalsByCompanyId(this.companyId);
  }

  // formatDates() {
  //   if (
  //     this.hiringCompany.jobFulfillmentDate == undefined ||
  //     this.hiringCompany.jobFulfillmentDate == null ||
  //     !this.hiringCompany.jobFulfillmentDate
  //   ) {
  //     this.jobFulfillmentDate = new Date().toISOString().split('T')[0];
  //     this.hiringCompany.taskActualStartDate = new Date();
  //   } else {
  //     // when status is inprogress then setting actual start date to current date
  //     this.todayForStartDate = new Date(this.task.taskActualStartDate)
  //       .toISOString()
  //       .split('T')[0];
  //   }
  // }

  async ngOnInit(): Promise<void> {
    await this.initialization();
    this.hiringCompany = history.state.hiringCompany;
    this.onChangeSubmissionMethod();
  }

  // fetching job location using company Id
  async getJobLocationsByCompanyId(companyId: number) {
    const data = await this.jobLocationService
      .getAllJobLocationByCompanyId(companyId)
      .toPromise();

    if (data) {
      this.allJobLocations = data;
    }
  }

  // fetching job location using company Id
  async getJobPortalsByCompanyId(companyId: number) {
    const data = await this.jobPortalService
      .getAllJobPortalsByCompanyId(companyId)
      .toPromise();

    if (data) {
      this.allJobPortals = data;
    }
  }

  // Function to add a new HiringCompany
  updateHiringCompany(hiringCompany: HiringCompany) {
    this.hiringCompanyService
      .updateHiringCompanyByHiringCompanyCode(
        hiringCompany.hiringCompanyId,
        hiringCompany
      )
      .subscribe(
        (data) => {
          console.log('Hiring company updated successfully:', data);
          this.dialogueBoxService
            .open('Hiring company updated successfully', 'information')
            .then((response) => {
              if (response) {
                this.location.back(); // Refresh the page
              }
            });
        },
        (error) => {
          console.error('Failed to update Hiring company:', error);
          this.dialogueBoxService.open(
            'Failed to update Hiring company. Already Exists',
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
    } else {
      this.selectedJobSubmissionMethod = {} as Jobportal;
    }
  }
}
