import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../class/task';
import { Employee } from 'src/app/classes/employee';
import { Status } from 'src/app/status/class/status';
import { StatusEnum } from 'src/app/status/enum/status.enum';
import { Visa } from 'src/app/visa/class/visa';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { StatusService } from 'src/app/status/services/status.service';
import { TaskService } from '../../services/task.service';
import { TextypeService } from 'src/app/taxtype/services/textype.service';
import { VisaService } from 'src/app/visa/services/visa.service';
import { JobportalService } from 'src/app/jobportal/services/jobportal.service';
import { JoblocationService } from 'src/app/joblocation/services/joblocation.service';

@Component({
  selector: 'app-create-child-task',
  templateUrl: './create-child-task.component.html',
  styleUrls: ['./create-child-task.component.css']
})
export class CreateChildTaskComponent {
  @Input() modalId: any;

  @ViewChild('createTaskChildModal') createTaskChildModal!: ElementRef;
  private renderer!: Renderer2;
  @Output() afterCreateTask: EventEmitter<any> = new EventEmitter();


  closeModal() {
    const modalElement = this.createTaskChildModal.nativeElement;
    if (modalElement) {
      const closeButton = modalElement.querySelector('#closeButton');
      if (closeButton) {
        this.renderer.selectRootElement(closeButton).click();
      }
    }
    this.afterCreateTask.emit();
  }



}
