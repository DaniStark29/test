import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { UserInterface } from '../../../models/cliente';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { RestauranteDataService } from 'src/app/service/restaurante/restaurante-data.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['username', 'email', 'phone', 'activo', 'delete', 'status'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public clienteDoc: AngularFirestoreDocument<UserInterface>;
  constructor(
    public dataCle: ClienteService,
    public db: AngularFirestore,
    public authService: RestauranteDataService,
    public http: Http,
  ) {}
  public clientes: UserInterface[];
  data: string;
  filterPost = '';
  pageActual: Number = 1;
  // Sucursales
  uidUser: string = null;
  public usuario: any = {};
  Uidsucursal: String = '';
  user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    uidSucursal: ''
  };
  ngOnInit() {
    // Sucursal
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.db
          .doc(`users/${this.uidUser}`)
          .valueChanges()
          .subscribe(data => {
            this.usuario = data;
            // tslint:disable-next-line:no-unused-expression
            this.Uidsucursal = this.usuario.uidSucursal;
            this.getListClientes(this.Uidsucursal);
            console.log('usuer', this.Uidsucursal);

            // Desglose de tabla
            this.dataCle.getClientes(this.Uidsucursal)
              .subscribe( res => (this.dataSource.data = res ));
          });
      }
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getListClientes(uidSucursal) {
    console.log('uidsucu', uidSucursal);
    this.db
      .collection('users', ref =>
        ref.where('tipo', '==', 4).where('uidSucursal', '==', uidSucursal)
      )
      .valueChanges()
      .subscribe(data => {
        this.clientes = data;
        console.log('usuarios', data);
        this.data = JSON.stringify(this.clientes);
        // this.clientes.forEach((clientes) => {
        //   console.log('idSucursal-Clientes', clientes.uid);
        //   const idSuc = clientes.uid;
        //   this.dataCle.updateCltIDSucursal(idSuc);
        // });
      });
      // UID-LEON: 9O7RF74AtRh7z1RWOOQL
  }

  onDeleteCliente(cliente: UserInterface) {
    const idCl = cliente.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Eliminaras al cliente!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.dataCle.deleteClientes(idCl);
        Swal.fire('Borrado', 'Cliente Borrado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al eliminar el cliente', 'error');
 });
    // const confirmacion = confirm(
    //   '¿Estas seguro de eliminar a este usuario de los registros?'
    // );
    // if (confirmacion) {
    //   this.dataCle.deleteClientes(idCliente);
    // }
  }

  onDesactivarCliente(cliente: UserInterface) {
    const idCl = cliente.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Desactivaras al cliente!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.authService.desactivarConvenio(idCl);
        Swal.fire('Desactivado', 'Cliente desactivado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al desactivar el cliente', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de desactivar este usuario?');
    // if (confirmacion) {
    //   this.authService.desactivarConvenio(uid);
    // }
  }

  onActivarCliente(cliente: UserInterface) {
    const idCl = cliente.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Activaras al cliente!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.authService.activarConvenio(idCl);
        Swal.fire('Activado', 'Cliente activado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al activar el cliente', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de activar este usuario?');
    // if (confirmacion) {
    //   this.authService.activarConvenio(uid);
    // }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
