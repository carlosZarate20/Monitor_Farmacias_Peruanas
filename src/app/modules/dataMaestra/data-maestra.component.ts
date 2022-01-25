import { Component, OnInit } from '@angular/core';
import { DataMaestraService } from '../services/dataMaestra.service';
import swal from'sweetalert2';


@Component({
    selector: 'app-data-maestra',
    templateUrl: './data-maestra.component.html',
    styleUrls: ['./data-maestra.component.css']
  })

  export class DataMaestraComponent implements OnInit {

    public model: any = {};
    titularAlert: string = 'Hola';

    constructor(private dataMaestraService: DataMaestraService){
      this.model.listDataMaestra = [];
    }
    ngOnInit() {
      console.log("obteniendo service");
      this.getDataMaestra();
    }

    getDataMaestra(){
      this.dataMaestraService.getDataMaestra().subscribe(
        res => {
          this.model.listDataMaestra = res;
          
          console.log(res);
        }
      );
    }

    sendProvider(codeTransaction: any){
      console.log(codeTransaction);
      swal.fire({
        title: '¿Seguro que desea ejecutar la transacción?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataMaestraService.sendMasterProvider(codeTransaction).subscribe(
            (res: any) => {
              console.log(res.message);
              this.getDataMaestra();
              if(!res.status){
                swal.fire({
                  icon: 'warning',
                  title: 'Oops...',
                  text: res.message,
                })
              }
              else{
                swal.fire(
                  'Enviado!',
                  'Se ejecuto correctamente el envio del maestro.',
                  'success'
                )
              } 
            }
          )
        } else {
          console.log('cancelado');
        }
      })
      
    }
    
  }