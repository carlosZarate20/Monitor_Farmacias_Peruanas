import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserService } from '../services/user.service';
import { stateTransactionLogPipe } from '../pipes/stateTransactionLog.pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';

const routes: Routes = [{ path: '', component: UserRegisterComponent }];

@NgModule({
  declarations: [UserRegisterComponent],
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
  bootstrap: [UserRegisterComponent],
  exports: [UserRegisterComponent],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class UserRegisterModule {}
