import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DetailTransaction } from "../model/DetailTransaction";
import { DetailsService } from "../services/details.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    public value: any;
    public detailTransaction: DetailTransaction = new DetailTransaction();
    constructor(public route: ActivatedRoute, private detailsService: DetailsService){
    }
    ngOnInit() {
        this.value = this.route.snapshot.paramMap.get('id');
        this.getDetailsTransaction(this.value);
    }

    getDetailsTransaction(id: any){

        this.detailsService.getDetailTransaction(id).subscribe(
            (res: any) => {
                this.detailTransaction.nameTransaction = res.nameTransaction;
                this.detailTransaction.dateTransaction = res.dateTransaction;
                this.detailTransaction.state = res.state;
                this.detailTransaction.request = res.request;
                this.detailTransaction.response = res.response;
                this.detailTransaction.transactionLogErrors = res.transactionLogErrors;
                console.log(res);
            }
        )
        
    }
}