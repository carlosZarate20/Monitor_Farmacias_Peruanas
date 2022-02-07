import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'stateTransactionLog'
})
export class stateTransactionLogPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        var response = "";
        switch(value){
            case "C":
                response = "Correcto";
                break;
            case "F":
                response = "Fallido";
                break;
            case "FP":
                response = "Fallido Parcial";
                break;
            default:
                break;
        }
        return response;
    }
}