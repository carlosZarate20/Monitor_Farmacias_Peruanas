import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
  })

  export class DashBoardComponent implements OnInit {

    public model: any = {};
    constructor(private dashboardService: DashboardService, private router: Router){
      this.model.listTransaction = [];
    }

    ngOnInit() {
      this.getTransaction();
    }

    getTransaction(){
      this.dashboardService.getTransaction().subscribe(
        res => {
          this.model.listTransaction = res;
          console.log(res);
        }
      )
    }

    detailTransaction(id: any){
      console.log(id);
      this.router.navigate(['/main/details' , id]);
    }
    
  } 