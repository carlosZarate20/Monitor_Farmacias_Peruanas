import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { ChartData, ChartType } from 'chart.js';
import { DataTransaction } from '../model/DataTransaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashBoardComponent implements OnInit {
  public model: any = {};
  public dataTransaction: DataTransaction = new DataTransaction();
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.model.listTransaction = [];
  }

  public doughnutChartLabels: string[] = ['Data Maestra', 'Transacciones'];
  public doughnutChartData: ChartData<'doughnut'> | undefined;
  public doughnutChartType: ChartType = 'doughnut';
  ngOnInit() {
    this.getTransaction();
    this.getTransactionChart(100);
  }

  getTransactionChart(value: any) {
    this.dashboardService.getCantTransactionMonth().subscribe((res: any) => {
      this.dataTransaction.cantMaestroCorrecto = res.cantMaestroCorrecto;
      this.dataTransaction.cantMaestroFallido = res.cantMaestroFallido;
      this.dataTransaction.cantMaestros = res.cantMaestros;
      this.dataTransaction.cantTransacciones = res.cantTransacciones;
      this.dataTransaction.cantTransactionCorrecto =
        res.cantTransactionCorrecto;
      this.dataTransaction.cantTransactionFallido = res.cantTransactionFallido;
      this.dataTransaction.total = res.total;

      this.doughnutChartData = {
        labels: this.doughnutChartLabels,
        datasets: [
          {
            data: [
              this.dataTransaction.cantMaestros,
              this.dataTransaction.cantTransacciones,
            ],
          },
        ],
      };
    });
  }

  getTransaction() {
    this.dashboardService.getTransaction().subscribe((res) => {
      this.model.listTransaction = res;
      console.log(res);
    });
  }

  detailTransaction(id: any) {
    console.log(id);
    this.router.navigate(['/main/details', id]);
  }
}
