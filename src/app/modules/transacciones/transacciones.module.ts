import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { TransaccionesComponent } from "./transacciones.component";

const routes: Routes = [
    { path: '', component: TransaccionesComponent},
];

@NgModule({
    declarations: [
        TransaccionesComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule, 
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    bootstrap: [TransaccionesComponent],
    exports: [TransaccionesComponent]
})
export class TransacionesModule { }