import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../class/task';
import { Employee } from 'src/app/classes/employee';
import { Status } from 'src/app/status/class/status';
import { TaskService } from '../../services/task.service';
import { StatusEnum } from 'src/app/status/enum/status.enum';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @ViewChild('createTaskModal') createTaskModal!: ElementRef;

  @Input() parentTask: Task = {} as Task;
  @Input() allEmployees: Employee[] = [];
  @Input() allStatus: Status[] = [];
  @Input() task: Task = {} as Task;

  employeeId: any;
  statusEnum = StatusEnum;

  // for today's date
  todayForEndDate: any;
  todayForStartDate: any;
  currentDate: any = new Date().toISOString().split('T')[0];

  taskName: any;
  constructor(

    private taskService: TaskService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.taskName = this.parentTask.taskName;
    console.log(this.taskName);
    console.log("parent Task " + JSON.stringify(this.parentTask));
    this.employeeId = localStorage.getItem("employeeId");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentTask']) {
      console.log("parent Task " + JSON.stringify(this.parentTask));

    }
  }

  onClickSubmit(task: Task) {
    console.log(task);
    this.taskService.createTaskAndAddReason(task).subscribe(
      (response) => {
        alert("Task created successfully");

        // for closing modal after creating task
        const modalElement = this.createTaskModal.nativeElement;
        if (modalElement) {
          const closeButton = modalElement.querySelector('#closeButton');
          if (closeButton) {
            this.renderer.selectRootElement(closeButton).click();
          }
        }
        

      },
      (error) => {
        console.log("Faild to create task!");

      }
    );

  }


  // calling function when use change the status on add task screen
  onChangeStatus(statusId: any) {
    // const status = this.allStatus.find(status => statusId == status.statusId);
    // const status = this.statusEnum[statusId];
    if (statusId) {
      switch (statusId) {

        // for created
        case this.statusEnum.CREATED.toString():
          // console.log("hey");
          this.todayForStartDate = '';
          this.task.taskActualStartDate = null as unknown as Date;

          this.todayForEndDate = '';
          this.task.taskActualEndDate = null as unknown as Date;
          break;

        // for In progress
        case this.statusEnum.INPROGRESS.toString():
          // when status is inprogress then setting actual start date to current date
          this.todayForStartDate = new Date().toISOString().split('T')[0];
          this.task.taskActualStartDate = new Date();

          this.todayForEndDate = '';
          this.task.taskActualEndDate = null as unknown as Date;
          console.log(this.task);

          break;

        // for done
        case this.statusEnum.DONE.toString():
          console.log(new Date().toString());

          // when status is done then setting actual end date to current date
          this.todayForEndDate = new Date().toISOString().split('T')[0];
          this.task.taskActualEndDate = new Date();

          this.todayForStartDate = '';
          this.task.taskActualStartDate = null as unknown as Date;
          break;

      }
    }
  }

  selectedDate!: Date; // This will hold the selected date with timestamp

  onDateSelect(event: any) {
    this.selectedDate = new Date(event.target.value);
    console.log(this.selectedDate);

  }
}
