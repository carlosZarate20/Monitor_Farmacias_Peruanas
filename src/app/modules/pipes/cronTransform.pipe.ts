import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cronTransform'
})
export class cronTransformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      
    var response = "";
    if(value != null && value != undefined)
    {
        var arraySplit = value.split(" ");
        var hour = arraySplit[2];
        var minutes = arraySplit[1];
        response = `Cada día a las ${this.getPathZero(hour, 2)}:${this.getPathZero(minutes, 2)}`;
    }
      
    return response;
  }

  getPathZero(number: any, length: any){
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;
  }

}