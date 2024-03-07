import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeTaskFilter'
})
export class EmployeeTaskFilterPipe implements PipeTransform {

  transform(taskArray: any[], employeeArray: any[]): any[] {
    if (employeeArray.length<=0) {
      return taskArray;
    }

    // Extract employee IDs from the employeeArray
    const employeeIds = employeeArray.map((employee) => employee.id);

    // Filter the taskArray based on employee ids
    return taskArray.filter((item) => employeeIds.includes(item.taskCreatedBy) || employeeIds.includes(item.taskAssignedTo));
  }
}
