import { Injectable, NgZone, ChangeDetectorRef } from '@angular/core';
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
  currentOngoingId = "id0";
  folderName = "";
  closedFolder = "../assets/img/closedFolder.svg";
  openedFolder = "../assets/img/openedFolder.svg";
  currentPath = "../";
  getJSONData() {
    this.http.get('../../assets/basicFolderData.json', this.httpOptions).subscribe(
      (data) => {
        this.jsonData = data;
      })
  }
  openClosePanel(id) {
    this.currentPath = this.getPath(id);
    this.currentOngoingId = id;
    for (var i = 0; i < (<any>this.jsonData).length; i++) {
      var sub = (list) => {
        for (var j = 0; j < list.length; j++) {
          if (list[j].subFolder.length > 0) {
            if (list[j].id == id) {
              list[j].open = !list[j].open;
              list[j].image = list[j].open ? this.openedFolder : this.closedFolder;
              break;
            }
            sub(list[j].subFolder)
          }
        }
      }
      // //console.warn(this.jsonData[i]);
      if (this.jsonData[i].subFolder.length > 0) {
        if (this.jsonData[i].id == id) {
          this.jsonData[i].open = !this.jsonData[i].open;
          this.jsonData[i].image = this.jsonData[i].open ? this.openedFolder : this.closedFolder;
          break;
        }
        sub(this.jsonData[i].subFolder)
      } else {
        if (this.jsonData[i].id == id) {
          this.jsonData[i].open = !this.jsonData[i].open;
          this.jsonData[i].image = this.jsonData[i].open ? this.openedFolder : this.closedFolder;
          break;
        }
      }
    }
  }
  createFolder() {
    var letterManipulate = this.currentOngoingId.split('id')[1].split('')
    var dummy;
    var count = 0;
    var getData = (data) => {
      count += 1;
      dummy = data;
      if (count != letterManipulate.length) { getData(data[Number(letterManipulate[count - 1]) - 1].subFolder) }
    }
    getData(this.jsonData)
    if (this.currentOngoingId == 'id0') {
      this.jsonData[(<any>this.jsonData).length] = {

        "type": "folder",
        "name": this.folderName,
        "id": this.setId(),
        "image": "../assets/img/closedFolder.svg",
        "open": false,
        "subFolder": []

      }
    } else {
      dummy.forEach((item) => {
        if (item.id == this.currentOngoingId) {
          item.subFolder.push({

            "type": "folder",
            "name": this.folderName,
            "id": this.setId(),
            "image": "../assets/img/closedFolder.svg",
            "open": false,
            "subFolder": []

          })
        }
      })
    }
  }
  setId() {
    if (this.currentOngoingId == 'id0') {
      return ('id' + ((<any>this.jsonData).length + 1))
    } else {
      var letterManipulate = this.currentOngoingId.split('id')[1].split('')
      var dummy;
      var count = 0;
      var getData = (data) => {
        count += 1;
        dummy = data;
        if (count != letterManipulate.length) { getData(data[Number(letterManipulate[count - 1]) - 1].subFolder) }
      }
      getData(this.jsonData)
      var dummy1;
      dummy.forEach((item) => {
        if (item.id == this.currentOngoingId) {
          dummy1 = item.subFolder
        }
      })
      return 'id' + letterManipulate.join('') + (dummy1.length + 1)
    }
  }
  getPath(id) {
    var letterManipulate = id.split('id')[1].split('')
    var count = 0;
    var name = "../";
    var getName = (data) => {
      count += 1;
      name += data[letterManipulate[count - 1] - 1].name + ' / ';
      if (count != letterManipulate.length) { getName(data[letterManipulate[count - 1] - 1].subFolder) }
    }
    getName(this.jsonData)
    //console.error('final name', name)
    return name;
  }
  deleteFolder(id) {
    //console.warn("deleteif", id);
    var letterManipulate = id.split('id')[1].split('')
    var count = 0;
    var oldInstance;
    var deleteName = (data) => {
      count += 1;
      for (let j = 0; j < data.length; j++) {
        if (data[j].id == id) {
          // //console.log(data[j], oldInstance)
          oldInstance.forEach((element, index) => {
            if (element == data[j]) {
              oldInstance.splice(index, 1)
            }
          });
          ; return
        }
      }
      if (count != letterManipulate.length) { oldInstance = data[letterManipulate[count - 1] - 1].subFolder; deleteName(data[letterManipulate[count - 1] - 1].subFolder) }
    }
    if (id.length > 3) {
      deleteName(this.jsonData)
    } else {
      (<any>this.jsonData).forEach((element, index) => {
        if (element.id == id) {
          (<any>this.jsonData).splice(index, 1)
        }
      });
    }
    if ((<any>this.jsonData).length == 0) {
      this.setInitial()
    }
  }
  setInitial() {
    this.currentOngoingId = 'id0'
    this.currentPath = '../'
  }
}
