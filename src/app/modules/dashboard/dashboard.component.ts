import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { DashboardService } from '../services/dashboard.service';
import { ChartData, ChartType, ChartConfiguration } from 'chart.js';
import { DataTransaction } from '../model/DataTransaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashBoardComponent implements OnInit {
  public model: any = {};
  public dataTransaction: DataTransaction = new DataTransaction();
  public pieChartPlugins = [DatalabelsPlugin];
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.model.listTransaction = [];
  }
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      // datalabels: {
      //   formatter: (value, ctx) => {
      //     if (ctx.chart.data.datasets) {
      //       // return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //   },
      // },
    },
  };
  public doughnutChartLabels: string[] = ['Data Maestra', 'Transacciones'];
  public doughnutChartData: ChartData<'doughnut'> | undefined;
  public doughnutChartType: ChartType = 'doughnut';

  // PolarArea
  public polarAreaChartLabels: string[] = [];
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: this.polarAreaChartLabels,
    datasets: [
      {
        data: [],
        label: 'Series 1',
      },
    ],
  };
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';

  ngOnInit() {
    this.getTransaction();
    this.getTransactionChart(100);
    this.getTransactionsLastSixMonths();
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
    });
  }

  getTransactionsLastSixMonths() {
    this.dashboardService
      .getTransactionsLastSixMonths()
      .subscribe((res: any) => {
        const dataLabel = res.map((el: any) => el.month);
        const dataSet = res.map((el: any) => el.qty);
        this.polarAreaChartLabels = dataLabel;
        this.polarAreaChartData = {
          labels: this.polarAreaChartLabels,
          datasets: [
            {
              data: dataSet,
              label: 'Series 1',
            },
          ],
        };
      });
  }

  detailTransaction(id: any) {
    this.router.navigate(['/main/details', id]);
  }
}
