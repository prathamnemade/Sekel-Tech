import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(public commonService: CommonService) { }
  @HostListener('document:click', ['$event'])
  subPanel(event) {
    if (event) {
      console.warn(event.path[1].id);
      this.commonService.openClosePanel(event.path[1].id);
    }
  }
}
