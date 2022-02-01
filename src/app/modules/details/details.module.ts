import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { stateDetailPipe } from "../pipes/stateDetail.pipe";
import { DashboardService } from "../services/dashboard.service";
import { DetailsService } from "../services/details.service";
import { DetailsComponent } from "./details.component";

const routes: Routes = [
    { path: '', component: DetailsComponent},
];

@NgModule({
    declarations: [
        DetailsComponent,
        stateDetailPipe
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
    providers: [DetailsService]
})

export class DetailsModule { }