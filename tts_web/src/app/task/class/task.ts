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
    isToggled: boolean ;
    hasChildInAllTasks:boolean;
}
