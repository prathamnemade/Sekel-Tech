import { Component, ViewEncapsulation, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(public commonService: CommonService, private ref: ChangeDetectorRef) { }
  entry = null;
  folderCreate = ''
  @HostListener('document:click', ['$event'])
  subPanel(event) {
    if (event) {
      console.warn("ee", event.path[1].id);
      if (event.path[1].id && event.path[1].id != 'typePanel') {
        console.warn("trigger");
        this.commonService.openClosePanel(event.path[1].id);
      }
    }
  }
  createFolder() {
    clearTimeout(this.entry)
    this.entry = setTimeout(() => {
      this.commonService.createFolder()
      this.folderCreate = 'Folder Created Successfully!!';
      setTimeout(() => {
        this.folderCreate = '';
        this.commonService.folderName = '';
      }, 2000);
    }, 2000);
  }
}

