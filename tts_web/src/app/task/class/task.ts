export interface Task {
    taskId: number;
    taskName: String;
    taskDescription: String;
    taskCreatedBy: number;
    taskAssignedTo: number;
    taskStatus: number;
    taskStartDate: Date;
    taskEndDate: Date;
    taskActualStartDate: Date;
    taskActualEndDate: Date;
    companyId: number;
    taskParent: number;
    havingChild: boolean;

    childTask: Task[];
    reason: String;
    employeeId: String;
    isToggled: boolean ;    // for checking that task is toggled or not (temporary variable)
    hasChildInAllTasks:boolean;

    // extra fields add for internal and external task
    internalId: number;
    externalId: number;
    jobPortalId: number;
    hiringCompanyName: string;
    jobTitle: string;
    experienceRequired: number;
    jobLocationId: number;
    jobReferenceNumber: string;
    taxTypeId: number;
    rate: number;
    recruiterName: string;
    recruiterEmail: string;
    recruiterPhone: string;
    jobSubmissionPortalId: number;
    datePosted: Date;
    jobLink: string;
    candidateId: number;
    candidateName: string;
    candidateCompany: string;
    companyAddress: string;
    hrName: string;
    hrEmail: string;
    hrPhone: string;
    visaId: number;
    placementId: number;
}
