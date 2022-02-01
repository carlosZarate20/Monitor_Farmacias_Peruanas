import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DATE } from "ngx-bootstrap/chronos/units/constants";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TransactionLogService } from "../services/transactionLog.service";

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

    constructor(private transactionLogService: TransactionLogService, private router: Router){
        this.model.listErrorType = [];
        this.model.listNameTransaction = [];
        this.model.listTransactionLog = [];
    }
    ngOnInit() {
        this.getListError();
        this.getNameTransaction();
        this.getListTransactionlog();
        
    }

    detailTransaction(id: any){
        console.log(id);
        this.router.navigate(['/main/details' , id]);
      }
      
    getListError(){
        this.transactionLogService.getErrorType().subscribe(
            res => {
                this.model.listErrorType = res;
                console.log(this.model.listErrorType);
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
    getListTransactionlog(){
        const findTransaction = {
            startDate: new Date(),
            endDate: new Date(),
            typeTransaction: '',
            state: 'F',
            page: 0,
            rows: 2
        }

        this.transactionLogService.listTransactionLog(findTransaction).subscribe(
            (res: any) => {
                this.model.listTransactionLog = res.data;
                this.returnedArray = this.model.listTransactionLog.slice(0, 10);
                console.log(this.model.listTransactionLog);
            }
        )
    }
    pageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedArray = this.model.listTransactionLog.slice(startItem, endItem);
      }
}