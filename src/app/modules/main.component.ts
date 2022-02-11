import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import SweetAlert from '../helpers/sweet.alert';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public model: any = {};
  public isLogged = false;
  public username = '';
  public password = '';
  public swal = new SweetAlert();

  constructor(private loginService: LoginService, private router: Router) {
    this.model.menu = {};
    this.model.menu.dataMaestra = { display: true, items: [] };
    this.model.menu.dashboard = { display: true, items: [] };
    this.model.menu.transacciones = { display: true, items: [] };
    this.model.menu.login = { display: true, items: [] };
    this.model.menu.usuarios = { display: true, items: [] };
    this.model.menu.config = { display: false, items: [] };

    this.model.menu.dataMaestra.items.push({
      url: '/main/dataMaestra',
      name: 'Programación',
      display: true,
    });
    this.model.menu.dashboard.items.push({
      url: '/main/home',
      name: 'Dashboard',
      display: true,
    });
    this.model.menu.transacciones.items.push({
      url: '/main/transacciones',
      name: 'Transacciones',
      display: true,
    });
    this.model.menu.login.items.push({ url: '/main/login', name: 'Login' });
    this.model.menu.usuarios.items.push({
      url: '/main/usuarios',
      name: 'Usuarios',
      display: true,
    });
    this.model.menu.usuarios.items.push({
      url: '/main/usuarios/registrar',
      name: 'Registrar Usuario',
      display: false,
    });
    this.model.menu.config.items.push({
      url: '/main/configuracion',
      name: 'Configuración',
      display: true,
    });
  }

  ngOnInit() {
    // localStorage.removeItem('TOKEN');
    const token = localStorage.getItem('TOKEN');

    if (token) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log('LOGIN', this.isLogged);
  }

  login() {
    if (this.username == '') {
      this.swal.alertWarning('Debe ingresar el nombre de usuario');
    } else if (this.password == '') {
      this.swal.alertWarning('Debe ingresar la contraseña');
    } else {
      this.swal.alertLoading();
      this.loginService.signIn(this.username, this.password).subscribe(
        (res: any) => {
          this.swal.cerrarAlert();
          console.log(res);
          const { status, message, data } = res;
          if (status == 200) {
            this.swal.alertSuccess('Inicio de sesión exitoso', () => {
              localStorage.setItem('TOKEN', data.token);
              window.location.reload();
            });
          } else {
            this.swal.alertWarning(message);
          }
        },
        (error) => {
          this.swal.cerrarAlert();
          this.swal.alertError(error);
        }
      );
      console.log(this.username, this.password);
    }
  }
  logout() {
    localStorage.removeItem('TOKEN');
    window.location.reload();
  }
}
