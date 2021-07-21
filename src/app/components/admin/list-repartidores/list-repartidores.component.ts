import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RepartidorDataService } from '../../../service/repartidor/repartidor-data.service';
import { UserInterface } from '../../../models/user';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-repartidores',
  templateUrl: './list-repartidores.component.html',
  styleUrls: ['./list-repartidores.component.css']
})


export class ListRepartidoresComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['username', 'email', 'phone', 'marca', 'placa', 'activo', 'edit', 'delete', 'status'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public repartidores: any[];

  constructor(public reDa: RepartidorDataService,
              public authService: AuthService,
              public db: AngularFirestore,
               ) { }
    data: string;
    filterPost = '';
    pageActual: number = 1;
    uidUser: string = null;
    public usuario: any = {};
    Uidsucursal: string = '';
    user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    direccion: '',
    uidSucursal: '',
    roles: {}
  };

  ngOnInit() {
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe(data => {
          this.usuario = data;
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          this.getListRepartidores(this.Uidsucursal);
          this.reDa.getRepartidores(this.Uidsucursal)
          .subscribe( res =>  (this.dataSource.data = res));

          // console.log('usuer', this.Uidsucursal);
        });
      }
    });

  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getListRepartidores(uidSucursal) {
    this.db.collection('users', ref => ref.where('tipo', '==', 2)
      .where('uidSucursal', '==', uidSucursal)).valueChanges().subscribe(data => {
        this.repartidores = data;
        // console.log('repas', data);
      });
    this.data = JSON.stringify(this.repartidores);
  }
  onDeleteRepartidor(repa: UserInterface) {
    const idRepa = repa.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Eliminaras al repartidor!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.reDa.deleteRepartidor(idRepa);
        Swal.fire('Borrado', 'Repartidor Borrado', 'success');
      } 
      // else {
      //   Swal.fire('Error!', 'Hubo un error al eliminar el repartidor');
      // }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al eliminar el repartidor', 'error');
 });
        // const confirmacion = confirm('¿Estas seguro de eliminar este repartidor?');
    // if (confirmacion) {
    //   this.reDa.deleteRepartidor(idRepartidor);
    // }
  }
  onDesactivarRepartidor(repa: UserInterface) {
    const idRepa = repa.uid;
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Desactivaras al repartidor!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.reDa.desactivarRepartidor(idRepa);
        Swal.fire('Desactivado', 'Repartidor desactivado de la plataforma', 'success');
      }
      //  else {
      //   Swal.fire('Error!', 'Hubo un error al desactivar el repartidor');
      // }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al desactivar el repartidor', 'error');
 });
  }
  onActivarRepartidor(repa: UserInterface) {
    const idRepa = repa.uid;
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Activaras al repartidor!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.reDa.activarRepartidor(idRepa);
        Swal.fire('Activado', 'Repartidor activado a la plataforma', 'success');
      }
      // else {
      //   Swal.fire('Error!', 'Hubo un error al activar el repartidor');
      // }
    }).catch((error) => {
         Swal.fire('Error!', 'Hubo un error al activar el repartidor', 'error');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
