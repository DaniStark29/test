import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../service/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private dataApi: DataApiService ) { }
public sucursales = [];
public sucursal = '';
  ngOnInit() {
    // this.dataApi.getAllSucursales().subscribe(sucursales => {
    //   console.log('SUCURSALES', sucursales);
    //   this.sucursales = sucursales;
    // });
  }

}
