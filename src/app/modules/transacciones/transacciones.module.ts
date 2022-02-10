import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TransaccionesComponent } from './transacciones.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TransactionLogService } from '../services/transactionLog.service';
import { stateTransactionLogPipe } from '../pipes/stateTransactionLog.pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';

const routes: Routes = [{ path: '', component: TransaccionesComponent }];

@NgModule({
  declarations: [TransaccionesComponent, stateTransactionLogPipe],
  imports: [
    RouterModule.forChild(routes),
    PaginationModule.forRoot(),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgxLoadingModule.forRoot({}),
  ],
  bootstrap: [TransaccionesComponent],
  exports: [TransaccionesComponent],
  providers: [
    TransactionLogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class TransacionesModule {}
