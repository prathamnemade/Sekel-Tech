import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
    this.getJSONData()
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  jsonData = {}
  getJSONData() {
    this.http.get('../../assets/basicFolderData.json', this.httpOptions).subscribe(
      (data) => {
        // data=JSON.stringify(data)
        this.jsonData = data;
      })
  }
  openClosePanel(id) {
    for (var i = 0; i < (<any>this.jsonData).length; i++) {
      var sub = (list) => {
        for (var j = 0; j < list.length; j++) {
          if (list[j].subFolder.length > 0) {
            if (list[j].id == id) {
              list[j].open = !list[j].open;
              break;
            }
            sub(list[j].subFolder)
          }
        }
      }
      // console.warn(this.jsonData[i]);
      if (this.jsonData[i].subFolder.length > 0) {
        if (this.jsonData[i].id == id) {
          this.jsonData[i].open = !this.jsonData[i].open;
          break;
        }
        sub(this.jsonData[i].subFolder)
      } else {
        if (this.jsonData[i].id == id) {
          this.jsonData[i].open = !this.jsonData[i].open;
          break;
        }
      }
    }
  }
}
