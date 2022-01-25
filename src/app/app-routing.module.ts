import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataMaestraComponent } from './modules/dataMaestra/data-maestra.component';

const routes: Routes = [
  { 
    path: 'main', 
    loadChildren: () => import('./modules/main.module').then(m => m.MainModule)
  },
  { path: '', redirectTo: '/main/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
