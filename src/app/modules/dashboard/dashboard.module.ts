import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { stateTransactionPipe } from '../pipes/stateTransaction.pipe';
import { DashboardService } from '../services/dashboard.service';
import { DashBoardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashBoardComponent }];

@NgModule({
  declarations: [DashBoardComponent, stateTransactionPipe],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
  ],
  bootstrap: [DashBoardComponent],
  exports: [DashBoardComponent],
  providers: [
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class DashBoardModule {}
