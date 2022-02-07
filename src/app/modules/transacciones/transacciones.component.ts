import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { DATE } from "ngx-bootstrap/chronos/units/constants";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DataSearchTransaction } from "../model/DataSearchTransaction";
import { TransactionLogService } from "../services/transactionLog.service";
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap/datepicker";
import swal from'sweetalert2';
defineLocale('es', esLocale);

@Component({
    selector: 'app-transacciones',
    templateUrl: './transacciones.component.html',
    styleUrls: ['./transacciones.component.css']
})

export class TransaccionesComponent implements OnInit {

    model: any = {};
    pages: any;
    contentArray = new Array(90).fill('');
    returnedArray?: string[];
    public dataSearchTransaction: DataSearchTransaction = new DataSearchTransaction();
    locale = 'es';
    bsConfig?: Partial<BsDatepickerConfig>;

    colorTheme = 'theme-red';
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    public loading = false;
    public primaryColour = '#ffffff';
    public secondaryColour = '#ccc';
    public coloursEnabled = false;
    public loadingTemplate!: TemplateRef<any>;
    public config = {
        animationType: ngxLoadingAnimationTypes.none,
        primaryColour: this.primaryColour,
        secondaryColour: this.secondaryColour,
        tertiaryColour: this.primaryColour,
        backdropBorderRadius: '3px',
    };

    constructor(private transactionLogService: TransactionLogService, private router: Router, private bsLocaleService: BsLocaleService){
        this.model.listErrorType = [];
        this.model.listNameTransaction = [];
        this.model.listTransactionLog = [];
        this.model.pages = 0;
        this.bsLocaleService.use('es');
    }
    ngOnInit() {
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
        this.dataSearchTransaction.startDate = new Date();
        let dateEnd = new Date();
        this.dataSearchTransaction.endDate = new Date(dateEnd.setDate(dateEnd.getDate() + 1));
        this.dataSearchTransaction.typeTransaction = '';
        this.dataSearchTransaction.state = '';
        this.dataSearchTransaction.page = 0;
        this.dataSearchTransaction.rows = 5;
        this.getListError();
        this.getNameTransaction();
        this.getFirstTransactionlog();
    }

    detailTransaction(id: any){
        console.log(id);
        this.router.navigate(['/main/details' , id]);
      }
      
    getListError(){
        this.transactionLogService.getErrorType().subscribe(
            res => {
                this.model.listErrorType = res;
            }
        );
    }

    getNameTransaction(){
        this.transactionLogService.getTransactionLogType().subscribe(
            res => {
                this.model.listNameTransaction = res;
            }
        );
    }
    getFirstTransactionlog(){
        this.transactionLogService.listTransactionLog(this.dataSearchTransaction).subscribe(
            (res: any) => {
                this.model.listTransactionLog = res.data;
                this.model.pages = res.pages;
            }
        )
    }

    findTransaction(){
        console.log(this.dataSearchTransaction);
        if(this.dataSearchTransaction.endDate <= this.dataSearchTransaction.startDate){
            swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'La fecha fin no puede ser menor que la fecha inicio',
              })
        } else {
            this.loading = true;

            this.transactionLogService.listTransactionLog(this.dataSearchTransaction).subscribe(
                (res: any) => {
                    this.model.listTransactionLog = res.data;
                    this.model.pages = res.pages;
                    this.loading = false;
                }
            )
        }
        
    }
    pageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        const page = (event.page - 1) * event.itemsPerPage;
        this.dataSearchTransaction.page = page;
        this.findTransaction();
      }
}