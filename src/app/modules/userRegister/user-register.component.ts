import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UserService } from '../services/user.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UserRegister } from '../model/UserRegister';
import SweetAlert from '../../helpers/sweet.alert';
defineLocale('es', esLocale);

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  public swal = new SweetAlert();
  model: any = {};
  pages: any;
  contentArray = new Array(90).fill('');
  returnedArray?: string[];
  public userRegister: UserRegister = new UserRegister();
  locale = 'es';
  bsConfig?: Partial<BsDatepickerConfig>;

  colorTheme = 'theme-red';
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = '#ffffff';
  public secondaryColour = '#ccc';
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private bsLocaleService: BsLocaleService,
    private _location: Location
  ) {
    this.model.registerUsers = [];
    this.model.pages = 0;
  }
  ngOnInit() {
    this.userRegister.name = '';
    this.userRegister.username = '';
    this.userRegister.email = '';
    this.userRegister.profileId = 0;

    // this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    // this.dataSearchTransaction.startDate = new Date();
    // let dateEnd = new Date();
    // this.dataSearchTransaction.endDate = new Date(
    //   dateEnd.setDate(dateEnd.getDate() + 1)
    // );
    // this.dataSearchTransaction.typeTransaction = '';
    // this.dataSearchTransaction.state = '';
    // this.dataSearchTransaction.page = 0;
    // this.dataSearchTransaction.rows = 5;
    // this.getregisterError();
    // this.getNameTransaction();
    // this.getFirstTransactionlog();
  }

  getUsers() {
    this.swal.alertLoading();
    // this.userService.registerUser(this.userFilter).subscribe(
    //   (res: any) => {
    //     this.swal.cerrarAlert();
    //     const { data, pages } = res;
    //     this.model.registerUsers = data;
    //     this.model.pages = pages;
    //   },
    //   (error) => {
    //     this.swal.cerrarAlert();
    //   }
    // );
  }

  goBack() {
    this._location.back();
  }

  saveUser() {
    if (this.userRegister.username.trim() == '') {
      this.swal.alertWarning('Debe ingresar un nombre de usuario');
    } else if (this.userRegister.name.trim() == '') {
      this.swal.alertWarning('Debe ingresar el nombre completo del usuario');
    } else if (this.userRegister.profileId == 0) {
      this.swal.alertWarning('Debe seleccionar un perfil');
    } else {
      this.swal.alertLoading();
      this.userService.saveUser(this.userRegister).subscribe(
        (res: any) => {
          this.swal.cerrarAlert();
          console.log(res);
          const { code, message } = res;
          if (code == 200) {
            this.swal.alertSuccess(message, () => {
              this._location.back();
            });
          } else {
            this.swal.alertError(message);
          }
        },
        (error: any) => {
          this.swal.cerrarAlert();
          this.swal.alertError(error);
        }
      );
    }
  }
}
