import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    public value: any;
    constructor(public route: ActivatedRoute){
    }
    ngOnInit() {
        this.value = this.route.snapshot.paramMap.get('id');
        this.getDetailsTransaction(this.value);
    }

    getDetailsTransaction(id: any){
        console.log('Detalle de evento ' + id);
    }
}