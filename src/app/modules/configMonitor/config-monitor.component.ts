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
      console.log(res);
      this.configMonitor.email = email;
      this.configMonitor.id = idConfigMonitor;
    });
  }

  goBack() {
    this._location.back();
  }

  saveConfig() {
    if (this.configMonitor.email.trim() == '') {
      this.swal.alertWarning(
        'Debe ingresar los correos para enviar las notificaciones de error'
      );
    } else {
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
