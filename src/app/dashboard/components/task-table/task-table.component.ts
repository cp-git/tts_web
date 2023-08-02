import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/classes/task';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {

  @Input() parentTaskData: Task[] = [];
  // @Input() childTaskData: Map<number, Task[]> = new Map();

  // @Output() onClickChild: EventEmitter<any> = new EventEmitter();

  childTaskArray: any;

  constructor(private dashboardService: DashboardService) {

  }

  childData: Task[] = [];
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['parentTaskData']) {
    //   this.parentTaskData = changes['parentTaskData'].currentValue;
    //   // console.log(this.parentTaskData);
  
    //   this.parentTaskData.forEach(task =>
    //     this.showChildTable2.set(task.taskId, false)
    //   );
    // }
    

    // if (changes['childTaskData']) {
    //   this.childTaskData = this.childTaskData;
    //   console.log(this.childTaskData);

    //   // // Convert the Map to an array of objects
    //   // this.childTaskArray = { key: any, value: any }[] = Array.from(this.childTaskData, ([key, value]) => ({ key, value }));

    //   this.childTaskData.forEach((value, key) =>
    //     value.forEach(task => this.showChildTable2.set(task.taskId, false))

    //   );
    // }
  }

  // for opening/ closing child table for task
  showChildTable: Map<number, boolean> = new Map();

  key: any;
  // for opening/ closing child table for task
  toggleChildTable(index: number, task: Task): void {
    // this.showChildTable[index] = !this.showChildTable[index];
    console.log(this.showChildTable.get(task.taskId));


    this.showChildTable.set(task.taskId, !this.showChildTable.get(task.taskId));

    this.key = task.taskId;
    // this.onClickChild.emit(task);
    this.onClickChild(task);
  }

  onClickChild(task: Task) {
    this.dashboardService.getChildTaskByParentId(task.taskId).subscribe(
      (response) => {
        // this.childTaskData.set(task.taskId, response);
        // console.table(this.childTaskData);
        this.childData = response;

       this.parentTaskData[this.parentTaskData.indexOf(task)].childTask = this.childData;
        
      },
      (error) => {
        console.log("Failed to load child task!");

      }
    );
  }

}
