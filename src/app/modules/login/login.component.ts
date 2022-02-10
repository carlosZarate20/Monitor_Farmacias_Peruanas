import { Component, OnInit, TemplateRef } from '@angular/core';
// import { DataMaestraService } from '../services/dataMaestra.service';
import swal from'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

  export class LoginComponent implements OnInit {

    masterProccessId: any;
    masterTransactionName: any;
    timeProcces: any;
    modalRef?: BsModalRef | null;  
    isActivated: boolean = false;
    entityTask: any;
    public model: any = {};
    titularAlert: string = 'Hola';

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
    ngOnInit() {
      // this.value = this.route.snapshot.paramMap.get('id');
      // this.getDetailsTransaction(this.value);
  }

    // constructor(private dataMaestraService: DataMaestraService,public modalService: BsModalService){
    //   this.model.listDataMaestra = [];
    // }

    
  }














    