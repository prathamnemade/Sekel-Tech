import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'segregate',
  pure: false
})
export class SegregatePipe implements PipeTransform {
  divToRender;
  count = 1;
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any, type?: any): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    this.count = 1;
    // console.log(value)
    var data = this.formTheLogic(value)
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(data);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(data);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(data);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(data);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(data);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
  formTheLogic(value) {
    this.divToRender = ``;
    for (var i = 0; i < value.length; i++) {
      var sub = (list) => {
        for (var j = 0; j < list.length; j++) {
          this.divToRender += this.formHTML(list[j]);
          if (list[j].subFolder.length > 0) {
            if (list[j].open) sub(list[j].subFolder)
          }
        }
      }
      if (value[i].subFolder.length > 0) {
        this.divToRender += this.formHTML(value[i])
        if (value[i].open) sub(value[i].subFolder)
      } else {
        this.divToRender += this.formHTML(value[i])
      }
    }
    return this.divToRender;
  }
  formHTML(value) {
    return `<div id='${value.id}' class='row panel' style='margin-left:${50 * (value.id.length - 3)}px' ><div class='col-md-1'><img src='${value.image}'></div><div class='col-md-10'>${value.name}</div></div>`
  }
}
