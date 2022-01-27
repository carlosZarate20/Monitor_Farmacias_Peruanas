import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  public model: any = {};

  constructor(private router: Router){
    this.model.menu = {};
    this.model.menu.dataMaestra = { display: true, items: [] };
    this.model.menu.dashboard= { display: true, items: [] };
    this.model.menu.transacciones = { display: true, items: []};



    this.model.menu.dataMaestra.items.push({ url: '/main/dataMaestra', name: 'Programación'});
    this.model.menu.dashboard.items.push({ url: '/main/dashboard', name: 'Dashboard'});
    this.model.menu.transacciones.items.push({ url: '/main/transacciones', name: 'Transacciones'});
  }

  ngOnInit() {
  }
  
}