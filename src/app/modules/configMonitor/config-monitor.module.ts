import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ConfigMonitorComponent } from './config-monitor.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfigMonitorService } from '../services/configMonitor.service';
import { stateTransactionLogPipe } from '../pipes/stateTransactionLog.pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';

const routes: Routes = [{ path: '', component: ConfigMonitorComponent }];

@NgModule({
  declarations: [ConfigMonitorComponent],
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
  bootstrap: [ConfigMonitorComponent],
  exports: [ConfigMonitorComponent],
  providers: [
    ConfigMonitorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class ConfigMonitorModule {}
