import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DataMaestraService } from '../services/dataMaestra.service';
import { DataMaestraComponent } from './data-maestra.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { programStatePipe } from '../pipes/programState.pipe';
import { cronTransformPipe } from '../pipes/cronTransform.pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';

const routes: Routes = [{ path: '', component: DataMaestraComponent }];

@NgModule({
  declarations: [DataMaestraComponent, programStatePipe, cronTransformPipe],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TimepickerModule.forRoot(),
    NgxLoadingModule.forRoot({}),
  ],
  bootstrap: [DataMaestraComponent],
  exports: [DataMaestraComponent],
  providers: [
    DataMaestraService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class DataMaestraModule {}
