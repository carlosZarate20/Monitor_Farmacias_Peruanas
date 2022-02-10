import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { TimepickerModule} 
from 'ngx-bootstrap/timepicker';
// import { programStatePipe } from '../pipes/programState.pipe';
// import { cronTransformPipe } from '../pipes/cronTransform.pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { LoginService } from '../services/login.service';

const routes: Routes = [
    { path: '', component: LoginComponent},
];

@NgModule({
    declarations: [
        LoginComponent
        // programStatePipe,
        // cronTransformPipe
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule, 
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        TimepickerModule.forRoot(),
        NgxLoadingModule.forRoot({})
    ],
    bootstrap: [LoginComponent],
    exports: [LoginComponent],
    providers: [LoginService]
})
export class LoginModule { }