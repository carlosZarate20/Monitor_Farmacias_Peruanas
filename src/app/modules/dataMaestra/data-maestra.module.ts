import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DataMaestraService } from '../services/dataMaestra.service';
import { DataMaestraComponent } from './data-maestra.component';
import { TimepickerModule} 
from 'ngx-bootstrap/timepicker';

const routes: Routes = [
    { path: '', component: DataMaestraComponent},
];

@NgModule({
    declarations: [
        DataMaestraComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule, 
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        TimepickerModule.forRoot()
    ],
    bootstrap: [DataMaestraComponent],
    exports: [DataMaestraComponent],
    providers: [DataMaestraService]
})
export class DataMaestraModule { }
