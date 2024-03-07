import { Task } from './task';

export class ExternalTask {
  hiringCompanyId!: number;

  taskId!: number;
  taskName!: String;
  taskDescription!: String;
  taskCreatedBy!: number;
  taskAssignedTo!: number;
  taskStatus!: number;
  taskStartDate!: Date;
  taskEndDate!: Date;
  taskActualStartDate!: Date;
  taskActualEndDate!: Date;
  companyId!: number;
  taskParent!: number;
  havingChild!: boolean;
  placementId!: number;
  reason!: String;
  employeeId!: String;

  childTask!: Task[];

  externalId!: number;
  candidateName!: string;
  candidateCompany!: string;
  companyAddress!: string;
  recruiterName!: string;
  recruiterEmail!: string;
  recruiterPhone!: string;
  visaId!: number;
  taxTypeId!: number;
  candidateExperience!: number;
  expectedMaxSalary!: number;
  expectedMinSalary!: number;
  willingToRelocate!: boolean;
  willingToNegotiateSalary!: boolean;
  reasonToFitForJob!: string;
}
