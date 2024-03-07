import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(dataArray: any[], statusArray: any[]): any[] {
    if (statusArray.length<=0) {
      return dataArray;
    }

    // Extract status IDs from the statusArray
    const statusIds = statusArray.map((status) => status.id);

    // Filter the dataArray based on taskStatus
    return dataArray.filter((item) => statusIds.includes(item.taskStatus));
  }

}
