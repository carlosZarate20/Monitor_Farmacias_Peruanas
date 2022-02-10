import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { MainComponent } from './main.component';
import { LoginService } from './services/login.service';


const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'dataMaestra',
    component: MainComponent,
    loadChildren: () =>
      import('./dataMaestra/data-maestra.module').then(
        (m) => m.DataMaestraModule
      ),
  },
  {
    path: 'home',
    component: MainComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashBoardModule),
  },
  {
    path: 'transacciones',
    component: MainComponent,
    loadChildren: () =>
      import('./transacciones/transacciones.module').then(
        (m) => m.TransacionesModule
      ),
  },
  {
    path: 'details/:id',
    component: MainComponent,
    loadChildren: () =>
      import('./details/details.module').then((m) => m.DetailsModule),
  },
  // {
  //     path: 'login',
  //     component: MainComponent,
  //     loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  // },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true,
    // },
    LoginService,
  ],
  bootstrap: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}
