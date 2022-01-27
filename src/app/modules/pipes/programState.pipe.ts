import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programState'
})
export class programStatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      var response = "";
      switch(value){
        case "I":
            response = "Inactivo";
            break;
        case "A":
            response = "Activo";
            break;
        default:
            break;
      }
    return response;
  }

}