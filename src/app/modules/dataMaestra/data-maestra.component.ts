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
      this.getDataMaestra();
    }

    getDataMaestra(){
      this.dataMaestraService.getDataMaestra().subscribe(
        res => {
          this.model.listDataMaestra = res;
          
        }
      );
    }

    sendProvider(codeTransaction: any){
      swal.fire({
        title: '¿Está seguro?',
        text: 'Esta tarea enviara datos actualizados a la plataforma LI',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
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
              this.getDataMaestra();
              if(!res.status){
                swal.close();
                swal.fire({
                  icon: 'warning',
                  title: '¡Advertencia!',
                  text: res.message,
                  confirmButtonColor: '#f44336'
                })
                
              }
              else{
                swal.close();
                swal.fire({
                  icon: 'success',
                  title: 'Enviado!',
                  text: res.message,
                  confirmButtonColor: '#f44336'
                })
                
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














    