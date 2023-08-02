import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-status-buttons',
  templateUrl: './status-buttons.component.html',
  styleUrls: ['./status-buttons.component.css']
})
export class StatusButtonsComponent {

  @Output() onClickCreated: EventEmitter<any> = new EventEmitter();
  @Output() onClickInProgress: EventEmitter<any> = new EventEmitter();
  @Output() onClickDone: EventEmitter<any> = new EventEmitter();

  onClickCreatedButton(event : any){
    this.onClickCreated.emit(event);
  }

  onClickInProgressButton(event : any){
    this.onClickInProgress.emit(event);
  }

  onClickDoneButton(event : any){
    this.onClickDone.emit(event);
  }
}
