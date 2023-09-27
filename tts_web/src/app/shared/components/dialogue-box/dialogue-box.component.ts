import { Component, Inject, Input } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrls: ['./dialogue-box.component.css']
})
export class DialogueBoxComponent {

  @Input() title: string | undefined;

  @Input() message: string;
  @Input() isWarning: boolean;
  @Input() isInformation: boolean;
  @Input() isDecision: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogueBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message;
    this.isDecision = data.isDecision;
    this.isInformation = data.isInformation;
    this.isWarning = data.isWarning;
  }
  onOk(): void {
    this.dialogRef.close(true);
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
