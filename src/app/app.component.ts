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
      //console.warn("ee", event.path[1].id);
      if (event.path[1].id && event.path[1].id != 'typePanel') {
        //console.warn("trigger");
        var testing = /id/g.test(event.path[1].id)
        if (testing) {
          this.doubleClickLogic(event)
        } else {
          this.commonService.openClosePanel(event.path[1].id);
        }
      }
    }
  }
  createFolder() {
    if (this.commonService.folderName != "") {
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
  count = 0;
  startDate: any;
  event1;
  event2;
  doubleClickLogic(e) {
    //console.log("eee", e);
    this.count += 1;
    if (this.count == 2) {
      this.event2 = e;
      var endDate: any = new Date()
      var difference = (endDate.getTime() - this.startDate.getTime()) / 1000;
      if (difference <= 0.500) {
        //console.log("differe", difference);

        if (this.event1.path[1].id == this.event2.path[1].id) {
          this.commonService.deleteFolder(e.path[1].id);
          // return 'double';
        }
        this.event1, this.event2 = "";
        this.count = 0;
        this.startDate = ""
      } else {
        this.count = 0;
        this.event1, this.event2 = "";
        this.startDate = ""
        return
      }
    } else {
      this.startDate = new Date()
      this.event1 = e;
      setTimeout(() => {
        if (!this.event2) {
          this.count = 0;
          this.commonService.openClosePanel(e.path[1].id);
          // return 'single'
        }
      }, 501);
    }
  }
}

