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
}
