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
        response = `Cada día a las ${arraySplit[1]}:${arraySplit[2]}`;       
    }
      
    return response;
  }

}