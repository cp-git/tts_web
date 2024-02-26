import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskService } from 'src/app/task/services/task.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  downloadProgress: number = 0;

  constructor(
    private taskService: TaskService,
    private http: HttpClient,
    private spinner: NgxSpinnerService

  ) {

  }
  ngOnInit(): void {

  }
  backupDir() {
    this.spinner.show(); // Show spinner

    this.taskService.backupDirectory().subscribe({
      next: (blobData: Blob) => {
        // Create a blob URL
        const blobUrl = URL.createObjectURL(blobData);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = blobUrl;

        // Set the download attribute and file name
        a.download = 'backup.zip'; // Set the desired file name here

        // Trigger a click event on the anchor to initiate the download
        a.click();

        // Clean up: revoke the blob URL after the download
        URL.revokeObjectURL(blobUrl);
      },
      error: (error) => {
        // Handle error here
        this.spinner.hide();
        console.error('An error occurred:', error);
      },
      complete: () => {
        // Hide spinner after receiving response or completing the observable
        this.spinner.hide();
      }
    });
  }


}
