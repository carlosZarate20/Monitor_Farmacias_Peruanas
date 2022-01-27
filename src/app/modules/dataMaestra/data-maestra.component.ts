import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataMaestraService } from '../services/dataMaestra.service';
import swal from'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
    selector: 'app-data-maestra',
    templateUrl: './data-maestra.component.html',
    styleUrls: ['./data-maestra.component.css']
  })

  export class DataMaestraComponent implements OnInit {

    masterProccessId: any;
    masterTransactionName: any;
    timeProcces: any;
    modalRef?: BsModalRef | null;  
    isActivated: boolean = false;
    entityTask: any;
    public model: any = {};
    titularAlert: string = 'Hola';


    constructor(private dataMaestraService: DataMaestraService,public modalService: BsModalService){
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

    openModal(template: TemplateRef<any>, codeTransaction: any, transactionName: any, state: any) {

      if(state == "A")
      {
        this.dataMaestraService.getTransactionTaskByCode(codeTransaction).subscribe(
          res => {
            this.entityTask = res;    
            var arraySplit = this.entityTask.cronExpression;
            var hours = arraySplit.split(" ")[1];
            var minutes = arraySplit.split(" ")[2];
            var d = new Date();
            d.setHours(hours);
            d.setMinutes(minutes);
            this.timeProcces = d;
            this.isActivated = true;   
             
          }
        );      


      }else{ 
        
        this.timeProcces = null;
    
        this.isActivated = false;   
      }
      this.masterProccessId = codeTransaction;
      this.masterTransactionName = transactionName;   
      this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg'});     
      
      
    }

    check(){
      console.log(this.timeProcces);
    }

    sendMasterProcess(){     

        if(this.timeProcces == null || this.timeProcces == undefined)
        {
          swal.fire('', 'Debes seleccionar algún intervalo de tiempo', 'warning')
        }else{
          this.dataMaestraService.sendMasterProccess( this.masterProccessId, this.timeProcces, this.isActivated).subscribe(
            res => {              
               this.modalRef?.hide();
               this.getDataMaestra();
            }
          );
        }
    }
    
  }














    