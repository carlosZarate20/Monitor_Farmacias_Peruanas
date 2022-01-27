import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { DashBoardComponent } from './dashboard.component';

const routes: Routes = [
    { path: '', component: DashBoardComponent},
];

@NgModule({
    declarations: [
        DashBoardComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule, 
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    bootstrap: [DashBoardComponent],
    exports: [DashBoardComponent],
    providers: [DashboardService]
})
export class DashBoardModule { }
