import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tts_web';
 
  constructor(private route: Router) {
  }
  
  RedirectToEmployee() {
    this.route.navigate(['employee'])
  }

}
