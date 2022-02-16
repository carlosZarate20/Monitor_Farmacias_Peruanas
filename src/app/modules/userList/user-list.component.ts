import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UserService } from '../services/user.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UserFilter } from '../model/UserFilter';
import SweetAlert from '../../helpers/sweet.alert';
defineLocale('es', esLocale);

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public swal = new SweetAlert();
  model: any = {};
  pages: any;
  contentArray = new Array(90).fill('');
  returnedArray?: string[];
  public userFilter: UserFilter = new UserFilter();
  locale = 'es';
  bsConfig?: Partial<BsDatepickerConfig>;

  constructor(
    private userService: UserService,
    private router: Router,
    private bsLocaleService: BsLocaleService
  ) {
    this.model.listUsers = [];
    this.model.pages = 0;
  }
  ngOnInit() {
    this.userFilter.name = '';
    this.userFilter.profileId = 0;
    this.userFilter.page = 0;
    this.userFilter.rows = 10;

    this.getUsers();
  }

  goDetail(id: any) {
    this.router.navigate(['/main/usuarios/actualizar', id]);
  }

  getUsers() {
    this.swal.alertLoading();
    this.userService.listUser(this.userFilter).subscribe(
      (res: any) => {
        this.swal.cerrarAlert();
        const { data, pages } = res;
        this.model.listUsers = data;
        this.model.pages = pages;
      },
      (error) => {
        this.swal.cerrarAlert();
      }
    );
  }

  registerUser() {
    this.router.navigate(['/main/usuarios/registrar']);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    const page = (event.page - 1) * event.itemsPerPage;
    this.userFilter.page = page;
    this.getUsers();
  }
}
