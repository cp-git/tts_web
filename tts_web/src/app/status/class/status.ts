export interface Status {
    statusId: number;
    statusCode: string;
    statusDescription: string;
    statusOrder: number;
    companyId: number;
    actualStartDate: boolean;
    actualEndDate: boolean;
    finalStatus: boolean
}