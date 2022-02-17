import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataMaestraService } from '../services/dataMaestra.service';
import swal from'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
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
          swal.fire({
            title: 'Cargando',
            didOpen: () => {
              swal.showLoading()
            }
          });
          this.dataMaestraService.sendMasterProvider(codeTransaction).subscribe(
            (res: any) => {
              console.log(res.message);
              this.getDataMaestra();
              if(!res.status){
                swal.close();
                swal.fire({
                  icon: 'warning',
                  title: '¡Advertencia!',
                  text: res.message,
                })
                
              }
              else{
                swal.close();
                swal.fire(
                  'Enviado!',
                  res.message,
                  'success'
                )
                
              } 
            }
          )
        } else {
        }
      })
      
    }

    openModal(template: TemplateRef<any>, codeTransaction: any, transactionName: any, state: any) {


      this.dataMaestraService.getTransactionTaskByCode(codeTransaction).subscribe(
        res => {
          this.entityTask = res;    
          var arraySplit = this.entityTask.cronExpression;
          var hours = arraySplit.split(" ")[2];
          var minutes = arraySplit.split(" ")[1];
          var d = new Date();
          d.setHours(hours);
          d.setMinutes(minutes);
          this.timeProcces = d;
          if(state == "I")
          {
            this.isActivated = false;  
          }else{
            this.isActivated = true;  
          }
           
        }
      );   
      
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














    