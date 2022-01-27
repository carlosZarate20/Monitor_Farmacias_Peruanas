import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { DashboardService } from "../services/dashboard.service";
import { DetailsComponent } from "./details.component";

const routes: Routes = [
    { path: '', component: DetailsComponent},
];

@NgModule({
    declarations: [
        DetailsComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule, 
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    bootstrap: [DetailsComponent],
    exports: [DetailsComponent],
    providers: [DashboardService]
})

export class DetailsModule { }