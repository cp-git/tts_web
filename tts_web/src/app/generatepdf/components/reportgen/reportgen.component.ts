import { Component, OnInit } from '@angular/core';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { TaskService } from 'src/app/task/services/task.service';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { ReasonService } from 'src/app/reason/services/reason.service';
import { DatePipe } from '@angular/common';
import { StatusService } from 'src/app/status/services/status.service';
import { Router } from '@angular/router';
import { Visa } from 'src/app/visa/class/visa';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
import { Employee } from 'src/app/classes/employee';
import { Status } from 'src/app/reason/class/status';
import { Reason } from 'src/app/reason/class/reason';
import { Location } from '@angular/common';
import { InternalTask } from 'src/app/task/class/internal-task';
import { environment } from 'src/environments/environment.dev';
import { BenchCandidateService } from 'src/app/bench-candidate/services/bench-candidate.service';
import { BenchCandidate } from 'src/app/bench-candidate/class/bench-candidate';
import { HiringCompanyService } from 'src/app/hiring-company/services/hiring-company.service';
import { HiringCompany } from 'src/app/hiring-company/class/hiring-company';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reportgen',
  templateUrl: './reportgen.component.html',
  styleUrls: ['./reportgen.component.css'],
})
export class ReportgenComponent implements OnInit {
  allVisas: Visa[] = [];
  allJobLocations: Joblocation[] = [];
  allJobPortals: Jobportal[] = [];
  allTaxTypes: Taxtype[] = [];
  employees: Employee[] = [];
  candidateEmp: Employee[] = [];
  allStatus: Status[] = [];
  reasons: Reason[] = [];
  allHiringCompany: HiringCompany[] = [];
  internalTask: InternalTask[] = [];
  benchEmp: BenchCandidate[] = [];
  employeeId: any;
  companyId: any;
  empData: any;
  candidateId: any;
  hiringCompanyId: any;
  displayCompanyLogo: any;
  today: Date = new Date();
  formattedDate: any;



  constructor(
    private taskService: TaskService,
    private dashboardService: DashboardService,
    private reasonService: ReasonService,
    private datePipe: DatePipe,
    private statusService: StatusService,
    private router: Router,
    private location: Location,
    private benchCandidateService: BenchCandidateService,
    private hiringCompanyService: HiringCompanyService,
    private _router:Router
  ) {
    this.formattedDate = this.datePipe.transform(this.today, 'MM-dd-yyyy');
    this.employeeId = sessionStorage.getItem('employeeId');
    this.companyId = sessionStorage.getItem('companyId');
    this.empData = sessionStorage.getItem('empData');
    this.empData = JSON.parse(this.empData);

    this.displayCompanyLogo = `${environment.companyUrl}/photos/${this.companyId}`;
  }

  ngOnInit(): void {
    this.getDataForDropdowns();
    this.getHiringCompaniesByCompanyId();
  }

  navigateToTask() {
    this.location.back();
    // this.router.navigate(['/dashboard']);
  }

  getDataForDropdowns() {
    this.taskService
      .getAllVisasByCompanyId(this.companyId)
      .subscribe((response) => {
        this.allVisas = response;
      });
    this.taskService
      .getAllTaxTypesByCompanyId(this.companyId)
      .subscribe((response) => {
        this.allTaxTypes = response;
      });
    this.taskService
      .getAllJobLocationsByCompanyId(this.companyId)
      .subscribe((response) => {
        this.allJobLocations = response;
      });
    this.taskService
      .getAllJobPortalsByCompanyId(this.companyId)
      .subscribe((response) => {
        this.allJobPortals = response;
      });

    this.statusService
      .getStatusesByCompanyId(this.companyId)
      .subscribe((response) => {
        this.allStatus = response;
      });
    this.getAllEmployees();
  }

  private getAllEmployees() {
    this.dashboardService.getAllEmployees(this.companyId).subscribe(
      (response) => {
        this.employees = response;
        // Assuming 'onBench' is a boolean property in the Employee model
        this.getAllBenchCandidateByCompnayId();
      },
      (error) => {
        // Handle error
        console.error('Failed to get all employees', error);
      }
    );
  }

  private getAllBenchCandidateByCompnayId() {
    this.benchCandidateService
      .getAllBenchCandidateByCompanyId(this.companyId)
      .subscribe(
        (response) => {
          this.benchEmp = response;
        },
        (error) => {
          console.log('Failed to get ');
        }
      );
  }

  private getHiringCompaniesByCompanyId() {
    this.hiringCompanyService
      .getAllHiringCompanyByCompanyId(this.companyId)
      .subscribe(
        (response) => {
          this.allHiringCompany = response;
        },
        (error) => {
          console.log('failed to get');
        }
      );
  }
  async generatePdf(candidateId: any) {
    // alert(candidateId)
    const internalTasks: any = await this.taskService
      .getInternalTasks(candidateId)
      .toPromise();
    const imageData: string = await this.getImageFromApi();
    // alert(internalTasks);
    const pdfContent: Content = [];
    const headerCellStyle = {
      fillColor: '#34495E',
      bold: true,
      fontSize: 12,
      alignment: 'center',
      color: 'white',
      margin: [5, 5],
    };
    const reasonHeader = {
      fillColor: '#A76AFF',
      bold: true,
      fontSize: 12,
      alignment: 'center',
      color: 'white',
      margin: [5, 5],
    };
    const taskFor = [
      {
        fillColor: '#F4F0FF',
        bold: true,
      },
    ];
    const comp = [
      {
        fillColor: '#A6FFA6',
        bold: true,
      },
    ];
    pdfContent.push({
      image: imageData,
      width: 100,
      height: 70,
      alignment: 'center',
    });
    pdfContent.push({
      text:
        'Bench job application for ' +
        this.benchEmp.find((bench) => candidateId == bench.benchCandidateId)
          ?.benchCandidateName,
      alignment: 'center',
      bold: true,
      fontSize: 15,
      color: '#1A0940',
    });
    for (const task of internalTasks) {
      if (task.hiringCompanyName !== null) {
        pdfContent.push({
          text:
            ' Recruiter - ' +
            this.employees.find((emp) => task.taskAssignedTo == emp.employeeId)
              ?.firstName +
            ' ' +
            this.employees.find((emp) => task.taskAssignedTo == emp.employeeId)
              ?.lastName,
          style: taskFor,
        });
        const childRow = [
          [
            { text: 'Hiring Company Name', style: comp },
            { text: task.hiringCompanyName, style: comp },
          ],
          [
            { text: 'Job Title', style: taskFor },
            { text: task.jobTitle, style: taskFor },
          ],
          [
            { text: 'Job City', style: taskFor },
            { text: task.jobCity, style: taskFor },
          ],
          [
            { text: 'Job State', style: taskFor },
            { text: task.jobState, style: taskFor },
          ],
          [
            { text: 'Rate', style: taskFor },
            { text: '$ ' + task.rate, style: taskFor },
          ],
        ];
        const childTableConfig = {
          widths: [140, 360],
          body: childRow,
        };
        pdfContent.push({ table: childTableConfig });
        pdfContent.push({ text: '', margin: [0, 5] });
        pdfContent.push({ text: 'Change History ', style: taskFor });
        try {
          const reasonData = await this.reasonService
            .getReasonsByTaskId(task.taskId)
            .toPromise();
          if (reasonData) {
            this.reasons = reasonData;
            // console.log(JSON.stringify(this.reasons));
            const taskReson: any = this.reasons.map((reason) => [
              {
                text: this.datePipe.transform(
                  reason.chgDateTime,
                  'MM-dd-yyyy HH:mm'
                ),
                fillColor: 'white',
              },
              { text: reason.reasonText },
              {
                text: this.allStatus.find(
                  (status) => reason.statusId == status.statusId
                )?.statusCode,
                fillColor: 'white',
              },
              {
                text:
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.firstName +
                  ' ' +
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.lastName,
                fillColor: 'white',
              },
              {
                text:
                  this.employees.find(
                    (emp) => reason.assignedTo == emp.employeeId
                  )?.firstName +
                  ' ' +
                  this.employees.find(
                    (emp) => reason.assignedTo == emp.employeeId
                  )?.lastName,
                fillColor: 'white',
              },
            ]);
            // console.log("hey2");
            const reasonsHeaderRow = [
              { text: 'Change Date & Time', style: reasonHeader },
              { text: 'Comments', style: reasonHeader },
              { text: 'Status', style: reasonHeader },
              { text: 'Changed By', style: reasonHeader },
              { text: 'Assigned To', style: reasonHeader },
            ];
            // console.log(JSON.stringify(taskReson));
            pdfContent.push({
              table: {
                widths: [110, 124, 80, 80, 80],
                body: [reasonsHeaderRow, ...taskReson],
              },
            });
            pdfContent.push({ text: ' ', margin: [0, 5] });
          }
        } catch (error) {
          console.error('Error fetching reasons:', error);
        }
      }
    }
    const documentDefinition: TDocumentDefinitions = {
      //  pageOrientation: 'landscape',
      content: pdfContent,
    };
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }
  async generatePdfForSourcing(hiringCompanyId: any) {
    // alert(hiringCompanyId)
    const externalTask: any = await this.taskService
      .getExternalTasks(hiringCompanyId)
      .toPromise();
    const imageData: string = await this.getImageFromApi();
    const pdfContent: Content = [];
    const reasonHeader = {
      fillColor: '#A76AFF',
      bold: true,
      fontSize: 12,
      alignment: 'center',
      color: 'white',
      margin: [5, 5],
    };
    const taskFor = [
      {
        fillColor: '#F4F0FF',
        bold: true,
      },
    ];
    const comp = [
      {
        fillColor: '#A6FFA6',
        bold: true,
      },
    ];
    pdfContent.push({
      image: imageData,
      width: 100,
      height: 70,
      alignment: 'center',
    });
    pdfContent.push({
      text:
        'Job submission for ' +
        this.allHiringCompany.find(
          (hiringCom) => hiringCompanyId == hiringCom.hiringCompanyId
        )?.hiringCompanyName,
      alignment: 'center',
      bold: true,
      fontSize: 15,
      color: '#1A0940',
    });
    for (const task of externalTask) {
      if (task.candidateName !== null) {
        pdfContent.push({
          text:
            ' Recruiter - ' +
            this.employees.find((emp) => task.taskAssignedTo == emp.employeeId)
              ?.firstName +
            ' ' +
            this.employees.find((emp) => task.taskAssignedTo == emp.employeeId)
              ?.lastName,
          style: taskFor,
        });
        const childRow = [
          [
            { text: 'Candidate Name', style: comp },
            { text: task.candidateName, style: comp },
          ],
          [
            { text: 'Visa Type', style: taskFor },
            {
              text: this.allVisas.find((visa) => task.visaId == visa.visaId)
                ?.visaType,
              style: taskFor,
            },
          ],
          [
            { text: 'Tax Type', style: taskFor },
            {
              text: this.allTaxTypes.find(
                (tax) => task.taxTypeId == tax.taxTypeId
              )?.taxTypeName,
              style: taskFor,
            },
          ],
          [
            { text: 'Willing To Relocate', style: taskFor },
            { text: task.willingToRelocate ? 'Yes' : 'No', style: taskFor },
          ],
        ];
        const childTableConfig = {
          widths: [140, 360],
          body: childRow,
        };
        pdfContent.push({ table: childTableConfig });
        pdfContent.push({ text: '', margin: [0, 5] });
        pdfContent.push({ text: 'Change History ', style: taskFor });
        try {
          const reasonData = await this.reasonService
            .getReasonsByTaskId(task.taskId)
            .toPromise();
          if (reasonData) {
            this.reasons = reasonData;
            // console.log(JSON.stringify(this.reasons));
            const taskReson: any = this.reasons.map((reason) => [
              {
                text: this.datePipe.transform(
                  reason.chgDateTime,
                  'MM-dd-yyyy HH:mm'
                ),
                fillColor: 'white',
              },
              { text: reason.reasonText },
              {
                text: this.allStatus.find(
                  (status) => reason.statusId == status.statusId
                )?.statusCode,
                fillColor: 'white',
              },
              {
                text:
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.firstName +
                  ' ' +
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.lastName,
                fillColor: 'white',
              },
              {
                text:
                  this.employees.find(
                    (emp) => reason.assignedTo == emp.employeeId
                  )?.firstName +
                  ' ' +
                  this.employees.find(
                    (emp) => reason.assignedTo == emp.employeeId
                  )?.lastName,
                fillColor: 'white',
              },
            ]);

            const reasonsHeaderRow = [
              { text: 'Change Date', style: reasonHeader },
              { text: 'Comments', style: reasonHeader },
              { text: 'Status', style: reasonHeader },
              { text: 'Changed By', style: reasonHeader },
              { text: 'Assigned To', style: reasonHeader },
            ];
            // console.log(JSON.stringify(taskReson));
            pdfContent.push({
              table: {
                widths: [110, 124, 80, 80, 80],
                body: [reasonsHeaderRow, ...taskReson],
              },
            });
            pdfContent.push({ text: ' ', margin: [0, 5] });
          }
        } catch (error) {
          console.error('Error fetching reasons:', error);
        }
      }
    }
    const documentDefinition: TDocumentDefinitions = {
      //pageOrientation: 'landscape',
      content: pdfContent,
    };
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }
  async getImageFromApi(): Promise<string> {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await fetch(this.displayCompanyLogo);
      const buffer = await response.arrayBuffer();
      return (
        'data:image/jpeg;base64,' +
        btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
      );
    } catch (error) {
      console.error('Error fetching image from API:', error);
      throw error;
    }
  }
  // Method to fetch reasons related to a specific task by its ID
  getReasonsByTaskId(taskId: number): void {
    this.reasonService.getReasonsByTaskId(taskId).subscribe(
      (data: any) => {
        this.reasons = data; // Store the retrieved reasons in the reasons array
        // // console.log(JSON.stringify(this.reasons));
      },
      (error: any) => {
        // alert('Error fetching reasons:');
      }
    );
  }

  async todaysProgressReport() {

    const internalExternalTask: any = await this.taskService
      .getInternalAndExternalTasksForTodayProgressByCompanyId(this.companyId)
      .toPromise();

    const internalTasks = internalExternalTask.internalTask;
    const externalTasks = internalExternalTask.externalTask;

    const imageData: string = await this.getImageFromApi();
    const pdfContent: Content = [];
    const headerCellStyle = {
      fillColor: '#34495E',
      bold: true,
      fontSize: 12,
      alignment: 'center',
      color: 'white',
      margin: [5, 5],
    };

    const reasonHeader = {
      fillColor: '#A76AFF',
      bold: true,
      fontSize: 12,
      alignment: 'center',
      color: 'white',
      margin: [5, 5],
    };
    const taskFor = [
      {
        fillColor: '#F4F0FF',
        bold: true,
      },
    ];
    const comp = [
      {
        fillColor: '#A6FFA6',
        bold: true,
      },
    ];



    pdfContent.push({
      image: imageData,
      width: 100,
      height: 70,
      alignment: 'center',
    });

    pdfContent.push({
      text:
        'Date : ' + this.formattedDate,
      alignment: 'right',
      bold: true,
      fontSize: 12,
      color: '#1A0940',
    });
    pdfContent.push({
      text:
        'Progress of bench candidate ',
      alignment: 'center',
      bold: true,
      fontSize: 15,
      color: '#1A0940',
    });

    for (const task of internalTasks) {
      if (task.hiringCompanyName !== null) {
        pdfContent.push({
          text: 'Candidate Name  : ' + this.benchEmp.find(emp => task.benchCandidateId == emp.benchCandidateId)?.benchCandidateName
        })
        pdfContent.push({
          text:
            ' Recruiter - ' +
            this.employees.find((emp) => task.taskAssignedTo == emp.employeeId)
              ?.firstName +
            ' ' +
            this.employees.find((emp) => task.taskAssignedTo == emp.employeeId)
              ?.lastName,
          style: taskFor,
        });

        const childRow = [
          [
            { text: 'Hiring Company Name', style: comp },
            { text: task.hiringCompanyName, style: comp },
          ],
          [
            { text: 'Job Title', style: taskFor },
            { text: task.jobTitle, style: taskFor },
          ],
          [
            { text: 'Job City', style: taskFor },
            { text: task.jobCity, style: taskFor },
          ],
          [
            { text: 'Job State', style: taskFor },
            { text: task.jobState, style: taskFor },
          ],
          [
            { text: 'Rate', style: taskFor },
            { text: '$ ' + task.rate, style: taskFor },
          ],
        ];

        const childTableConfig = {
          widths: [140, 360],
          body: childRow,
        };

        pdfContent.push({ table: childTableConfig });

        pdfContent.push({ text: '', margin: [0, 5] });
        pdfContent.push({ text: 'Change History ', style: taskFor });

        try {
          const reasonData = await this.reasonService
            .getReasonsByTaskId(task.taskId)
            .toPromise();
          if (reasonData) {
            this.reasons = reasonData;
            // console.log(JSON.stringify(this.reasons));

            const taskReson: any = this.reasons.map((reason) => [
              {
                text: this.datePipe.transform(
                  reason.chgDateTime,
                  'MM-dd-yyyy HH:mm'
                ),
                fillColor: 'white',
              },
              { text: reason.reasonText },
              {
                text: this.allStatus.find(
                  (status) => reason.statusId == status.statusId
                )?.statusCode,
                fillColor: 'white',
              },
              {
                text:
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.firstName +
                  ' ' +
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.lastName,
                fillColor: 'white',
              },
              {
                text:
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.firstName +
                  ' ' +
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.lastName,
                fillColor: 'white',
              },
            ]);
            // console.log("hey2");
            const reasonsHeaderRow = [
              { text: 'Change Date', style: reasonHeader },
              { text: 'Comments', style: reasonHeader },
              { text: 'Status', style: reasonHeader },
              { text: 'Changed By', style: reasonHeader },
              { text: 'Assigned To', style: reasonHeader },
            ];
            // console.log(JSON.stringify(taskReson));

            pdfContent.push({
              table: {
                widths: [110, 124, 80, 80, 80],
                body: [reasonsHeaderRow, ...taskReson],
              },
            });
            pdfContent.push({ text: ' ', margin: [0, 5] });
          }
        } catch (error) {
          console.error('Error fetching reasons:', error);
        }
      }
    }

    pdfContent.push({
      text:
        'Progress of sourcing candidate',
      alignment: 'center',
      bold: true,
      fontSize: 15,
      color: '#1A0940',
    });



    for (const task of externalTasks) {

      if (task.candidateName !== null) {

        pdfContent.push({
          text: 'Hiring Company  :  ' + this.allHiringCompany.find(hiringCom => task.hiringCompanyId == hiringCom.hiringCompanyId)?.hiringCompanyName,
        })
        pdfContent.push({

          text:
            ' Recruiter - ' +
            this.employees.find((emp) => task.taskAssignedTo == emp.employeeId)
              ?.firstName +
            ' ' +
            this.employees.find((emp) => task.taskAssignedTo == emp.employeeId)
              ?.lastName,
          style: taskFor,
        });

        const childRow = [
          [
            { text: 'Candidate Name', style: comp },
            { text: task.candidateName, style: comp },
          ],
          [
            { text: 'Visa Type', style: taskFor },
            {
              text: this.allVisas.find((visa) => task.visaId == visa.visaId)
                ?.visaType,
              style: taskFor,
            },
          ],
          [
            { text: 'Tax Type', style: taskFor },
            {
              text: this.allTaxTypes.find(
                (tax) => task.taxTypeId == tax.taxTypeId
              )?.taxTypeName,
              style: taskFor,
            },
          ],
          [
            { text: 'Willing To Relocate', style: taskFor },
            { text: task.willingToRelocate ? 'Yes' : 'No', style: taskFor },
          ],
        ];

        const childTableConfig = {
          widths: [140, 360],
          body: childRow,
        };

        pdfContent.push({ table: childTableConfig });

        pdfContent.push({ text: '', margin: [0, 5] });
        pdfContent.push({ text: 'Change History ', style: taskFor });

        try {
          const reasonData = await this.reasonService
            .getReasonsByTaskId(task.taskId)
            .toPromise();
          if (reasonData) {
            this.reasons = reasonData;
            // console.log(JSON.stringify(this.reasons));

            const taskReson: any = this.reasons.map((reason) => [
              {
                text: this.datePipe.transform(
                  reason.chgDateTime,
                  'MM-dd-yyyy HH:mm'
                ),
                fillColor: 'white',
              },
              { text: reason.reasonText },
              {
                text: this.allStatus.find(
                  (status) => reason.statusId == status.statusId
                )?.statusCode,
                fillColor: 'white',
              },
              {
                text:
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.firstName +
                  ' ' +
                  this.employees.find(
                    (emp) => reason.employeeId == emp.employeeId
                  )?.lastName,
                fillColor: 'white',
              },
              {
                text:
                  this.employees.find(
                    (emp) => reason.assignedTo == emp.employeeId
                  )?.firstName +
                  ' ' +
                  this.employees.find(
                    (emp) => reason.assignedTo == emp.employeeId
                  )?.lastName,
                fillColor: 'white',
              },
            ]);
            // console.log("hey2");
            const reasonsHeaderRow = [
              { text: 'Change Date', style: reasonHeader },
              { text: 'Comments', style: reasonHeader },
              { text: 'Status', style: reasonHeader },
              { text: 'Changed By', style: reasonHeader },
              { text: 'Assigned To', style: reasonHeader },
            ];
            // console.log(JSON.stringify(taskReson));

            pdfContent.push({
              table: {
                widths: [110, 124, 80, 80, 80],
                body: [reasonsHeaderRow, ...taskReson],
              },
            });
            pdfContent.push({ text: ' ', margin: [0, 5] });
          }
        } catch (error) {
          console.error('Error fetching reasons:', error);
        }
      }
    }

    const documentDefinition: TDocumentDefinitions = {
      //  pageOrientation: 'landscape',
      content: pdfContent,
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }


  close(){
    this._router.navigate(['/dashboard'])
    
  }
}
