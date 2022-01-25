import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
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
        ReactiveFormsModule
    ],
    bootstrap: [DashBoardComponent],
    exports: [DashBoardComponent]
})
export class DashBoardModule { }
