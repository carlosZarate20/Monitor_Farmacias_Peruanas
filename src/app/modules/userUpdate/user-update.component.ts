import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UserService } from '../services/user.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UserUpdate } from '../model/UserUpdate';
import SweetAlert from '../../helpers/sweet.alert';
defineLocale('es', esLocale);

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  public swal = new SweetAlert();
  public value: any;
  model: any = {};
  pages: any;
  contentArray = new Array(90).fill('');
  returnedArray?: string[];
  public userUpdate: UserUpdate = new UserUpdate();
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
    public route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private bsLocaleService: BsLocaleService,
    private _location: Location
  ) {
    this.value = this.route.snapshot.paramMap.get('id');
    this.model.updateUsers = [];
    this.model.pages = 0;
  }
  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.swal.alertLoading();
    this.userService.getInfoUser(this.value).subscribe((res: any) => {
      this.swal.cerrarAlert();
      const { idUserAccess, name, username, state, email, profileUser } = res;
      this.userUpdate.name = name;
      this.userUpdate.username = username;
      this.userUpdate.email = email;
      this.userUpdate.state = state;
      this.userUpdate.profileId = profileUser.idProfileUser;
      this.userUpdate.id = idUserAccess;
    });
  }
  getUsers() {
    this.swal.alertLoading();
    // this.userService.updateUser(this.userFilter).subscribe(
    //   (res: any) => {
    //     this.swal.cerrarAlert();
    //     const { data, pages } = res;
    //     this.model.updateUsers = data;
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
    if (this.userUpdate.username.trim() == '') {
      this.swal.alertWarning('Debe ingresar un nombre de usuario');
    } else if (this.userUpdate.name.trim() == '') {
      this.swal.alertWarning('Debe ingresar el nombre completo del usuario');
    } else if (this.userUpdate.profileId == 0) {
      this.swal.alertWarning('Debe seleccionar un perfil');
    } else {
      this.swal.alertLoading();
      this.userService.updateUser(this.userUpdate).subscribe(
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
