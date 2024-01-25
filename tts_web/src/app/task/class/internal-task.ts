import { Task } from './task';

export class InternalTask {
  benchCandidateId!: number;

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

  internalId!: number;
  hiringCompanyName!: string;
  jobTitle!: string;
  jobLocationId!: number;
  jobAddress!: string;
  jobCity!: string;
  jobState!: string;
  experienceRequired!: number;
  rate!: number;
  datePosted!: Date;
  jobLink!: string;
  jobPortalId!: number;
  jobReferenceNumber!: string;
  taxTypeId!: number;
  vendorName!: string;
  vendorEmail!: string;
  vendirPhone!: string;
  jobSubmissionPortalId!: number;
  portalName!: string;
  commentsOnCandidate!: string;
}
