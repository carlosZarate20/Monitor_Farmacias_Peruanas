import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ConfigMonitorService } from '../services/configMonitor.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ConfigMonitor } from '../model/ConfigMonitor';
import SweetAlert from '../../helpers/sweet.alert';
defineLocale('es', esLocale);

@Component({
  selector: 'app-config-monitor',
  templateUrl: './config-monitor.component.html',
  styleUrls: ['./config-monitor.component.css'],
})
export class ConfigMonitorComponent implements OnInit {
  public swal = new SweetAlert();
  model: any = {};
  pages: any;
  contentArray = new Array(90).fill('');
  returnedArray?: string[];
  emails = Array<string>();
  public configMonitor: ConfigMonitor = new ConfigMonitor();

  constructor(
    private configMonitorService: ConfigMonitorService,
    private router: Router,
    private bsLocaleService: BsLocaleService,
    private _location: Location
  ) {
    this.model.registerUsers = [];
    this.model.pages = 0;
  }
  ngOnInit() {
    this.configMonitor.email = '';
    this.getConfig();
  }

  getConfig() {
    this.configMonitorService.getConfig().subscribe((res: any) => {
      const { email, idConfigMonitor } = res;
      this.configMonitor.email = email;
      this.emails = email.split(',');
      this.configMonitor.id = idConfigMonitor;
    });
  }

  goBack() {
    this._location.back();
  }

  addElement() {
    this.emails?.push('');
  }

  removeElement(i: number) {
    this.emails.splice(i, 1);
  }

  onChangeEmail(e: any, i: number) {
    const val = e.target.value;
    this.emails[i] = val;
  }

  emailIsValid = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  validateEmails = (array: Array<string>) => {
    let valid = true;
    array.forEach((el: string) => {
      if (!this.emailIsValid(el)) {
        valid = false;
      }
    });
    return valid;
  };

  saveConfig() {
    const emailSended = this.emails.join(',');
    if (emailSended.trim() == '') {
      this.swal.alertWarning(
        'Debe ingresar los correos para enviar las notificaciones de error'
      );
    } else if (!this.validateEmails(this.emails)) {
      this.swal.alertWarning('Debe ingresar correos válidos');
    } else {
      this.configMonitor.email = emailSended;
      this.configMonitorService
        .saveConfig(this.configMonitor)
        .subscribe((res: any) => {
          const { code, message } = res;
          if (code == 200) {
            this.swal.alertSuccess(message, () => {
              this.getConfig();
            });
          } else {
            this.swal.alertError(message);
          }
        });
    }
  }
}
