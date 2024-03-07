export class ExternalTaskDTO {
    hiringCompanyId!: number;
    taskId!: number;
    taskName!: string;
    taskDescription!: string;
    taskCreatedBy!: number;
    taskAssignedTo!: number;
    taskStatus!: number;
    taskStartDate!: Date;
    taskEndDate!: Date;
    taskActualStartDate!: Date;
    taskActualEndDate!: Date;
    companyId!: number;
    placementId!: number;
    taskParent!: number;
    reason!: string;
    employeeId!: number;
    fileName!: string;
    havingChild!: boolean;
    externalId!: number;
    candidateCompany!: string;
    companyAddress!: string;
    recruiterName!: string;
    recruiterEmail!: string;
    recruiterPhone!: string;
    candidateName!: string;
    visaId!: number;
    taxTypeId!: number;
    candidateExperience!: number;
    expectedMaxSalary!: number;
    expectedMinSalary!: number;
    willingToRelocate!: boolean;
    willingToNegotiateSalary!: boolean;
    reasonToFitForJob!: string;
}
