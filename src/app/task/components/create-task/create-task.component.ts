import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../class/task';
import { TaskModule } from '../../task.module';
import { Employee } from 'src/app/classes/employee';
import { Status } from 'src/app/classes/status';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @Input() parentTask: Task = {} as Task;
  @Input() allEmployees: Employee[] = [];
  @Input() allStatus: Status[] = [];
  @Input() task: Task = {} as Task;

  employeeId: any;

  constructor(

    private taskService: TaskService

  ) { }

  ngOnInit(): void {
    this.employeeId = localStorage.getItem("employeeId");
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onClickSubmit(task: Task) {
    console.log(task);
    this.taskService.createTask(task).subscribe(
      (response)=>{
        alert("Task created successfully");
      },
      (error)=>{
        console.log("Faild to create task!");
        
      }
    );

  }

  todayForEndDate: any;
  todayForStartDate: any;

  onChangeStatus(statusId: any) {
    const status = this.allStatus.find(status => statusId == status.statusId);
    console.log(status);
    if (status) {
      switch (status.statusCode.toLowerCase()) {
        case 'create':
          break;

        case 'inprogress':
          // when status is inprogress then setting actual start date to current date
          // this.todayForStartDate =new Date().toISOString().split('T')[0];
          // this.task.taskActualStartDate= new Date();

          // this.todayForEndDate = '';
          // this.task.taskActualEndDate = null as unknown as Date; 
          // console.log(this.task);

          break;

        case 'done':
          console.log(new Date().toString());

          // when status is done then setting actual end date to current date
          // this.todayForEndDate = new Date().toISOString().split('T')[0];
          // this.task.taskActualEndDate = new Date();

          // this.todayForStartDate = '';
          // this.task.taskActualStartDate = null as unknown as Date; 
          break;

      }
    }
  }


}
