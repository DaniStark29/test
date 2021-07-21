import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../service/data-api.service';
import { SucursalInterface } from '../../../models/sucursal';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-list-sucursales',
  templateUrl: './list-sucursales.component.html',
  styleUrls: ['./list-sucursales.component.css']
})
export class ListSucursalesComponent implements OnInit {

  constructor( private dataApi: DataApiService, private authService: AuthService ) { }
  filterPost = '';
  private sucursales: SucursalInterface[];
  pageActual: number = 1;
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListSucursales();
    this.getCurrent();
  }
  getCurrent() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRoles => {
          this.isAdmin = Object.assign({}, userRoles.roles).hasOwnProperty('admin');
        })
      }
    })
  }
  getListSucursales() {
    this.dataApi.getAllSucursales().subscribe(sucursales => {
      this.sucursales = sucursales;
    });
  }
  onDeleteSucursal(idSucursal: string): void {
  const confirmacion = confirm('¿Estas seguro de eliminar este registro?');
  if (confirmacion) {
     this.dataApi.deleteSucursal(idSucursal);
  }
}
onPreUpdateSucursal( sucursal: SucursalInterface) {
  console.log('UPDATE', sucursal);
    this.dataApi.selectedSucursal = Object.assign({}, sucursal);
}
}
