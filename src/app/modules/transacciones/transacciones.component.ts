import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DataSearchTransaction } from '../model/DataSearchTransaction';
import { TransactionLogService } from '../services/transactionLog.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import swal from 'sweetalert2';
defineLocale('es', esLocale);

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css'],
})
export class TransaccionesComponent implements OnInit {
  model: any = {};
  pages: any;
  contentArray = new Array(90).fill('');
  returnedArray?: string[];
  public dataSearchTransaction: DataSearchTransaction =
    new DataSearchTransaction();
  locale = 'es';
  bsConfig?: Partial<BsDatepickerConfig>;
  rows: any;

  colorTheme = 'theme-red';

  constructor(
    private transactionLogService: TransactionLogService,
    private router: Router,
    private bsLocaleService: BsLocaleService
  ) {
    this.model.listErrorType = [];
    this.model.listNameTransaction = [];
    this.model.listTransactionLog = [];
    this.model.pages = 0;
    this.bsLocaleService.use('es');
  }
  ngOnInit() {
    this.rows = [5, 10, 15];
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.dataSearchTransaction.startDate = new Date();
    let dateEnd = new Date();
    this.dataSearchTransaction.endDate = new Date(
      dateEnd.setDate(dateEnd.getDate() + 1)
    );
    this.dataSearchTransaction.typeTransaction = '';
    this.dataSearchTransaction.state = '';
    this.dataSearchTransaction.page = 0;
    this.dataSearchTransaction.rows = 10;
    this.getListError();
    this.getNameTransaction();
    this.getFirstTransactionlog();
  }

  detailTransaction(id: any) {
    this.router.navigate(['/main/details', id]);
  }

  getListError() {
    this.transactionLogService.getErrorType().subscribe(
      (res) => {
        this.model.listErrorType = res;
      },
      (error) => {
      }
    );
  }

  getNameTransaction() {
    this.transactionLogService.getTransactionLogType().subscribe((res) => {
      this.model.listNameTransaction = res;
    });
  }
  getFirstTransactionlog() {
    swal.fire({
      title: 'Cargando',
      didOpen: () => {
        swal.showLoading()
      }
    });
    this.transactionLogService
      .listTransactionLog(this.dataSearchTransaction)
      .subscribe((res: any) => {
        this.model.listTransactionLog = res.data;
        this.model.pages = res.pages;
        swal.close();
      });
  }

  findTransaction() {
    if (
      this.dataSearchTransaction.endDate <= this.dataSearchTransaction.startDate
    ) {
      swal.fire({
        icon: 'warning',
        title: '¡Advertencia!',
        text: 'La fecha fin no puede ser menor que la fecha inicio.',
        confirmButtonColor: '#f44336'
      });
    } else {
      swal.fire({
        title: 'Cargando',
        didOpen: () => {
          swal.showLoading()
        }
      });

      this.transactionLogService
        .listTransactionLog(this.dataSearchTransaction)
        .subscribe((res: any) => {
          this.model.listTransactionLog = res.data;
          this.model.pages = res.pages;
          if(this.model.listTransactionLog.length< this.dataSearchTransaction.rows){
            
            this.dataSearchTransaction.page = 0;
          }
          swal.close();
        });
    }
  }
  pageChanged(event: PageChangedEvent): void {
    // const startItem = (event.page - 1) * event.itemsPerPage;
    // const endItem = event.page * event.itemsPerPage;
    const page = (event.page - 1) * event.itemsPerPage;
    this.dataSearchTransaction.page = page;
    this.findTransaction();
  }

  changeRow(){
    this.findTransaction();
  }
}
