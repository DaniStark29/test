import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdministradorDataService } from '../../../service/administrador/administrador-data.service';
import { UserInterface } from '../../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-administradores',
  templateUrl: './list-administradores.component.html',
  styleUrls: ['./list-administradores.component.css']
})
export class ListAdministradoresComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['username', 'email', 'phone', 'activo', 'delete', 'status'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dataAdm: AdministradorDataService,
    public db: AngularFirestore,
    private authService: AuthService) { }
  public administradores: any[];
  filterPost = '';
  // Sucursales
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
  pageActual: number = 1;
  ngOnInit() {
    // Sucursal
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe(data => {
          this.usuario = data;
          console.log('usuario', data);
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          this.getListAdministrador(this.Uidsucursal);
          console.log('usuer', this.Uidsucursal);

          // Desglose de tabla
          this.dataAdm.getAdmins(this.Uidsucursal)
            .subscribe( res => (this.dataSource.data = res));
        });
      }
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getListAdministrador(uidSucursal) {
    console.log('uidsucu', uidSucursal);
    this.db.collection('users', ref => ref.where('tipo', '==', 1)
      .where('uidSucursal', '==', uidSucursal)).valueChanges().subscribe(data => {
        this.administradores = data;
        console.log('admins', data);
      });
  }
  onDeleteAdmin(idAdmin: UserInterface) {
    const idAd = idAdmin.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Eliminaras al administrador!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.dataAdm.deleteAdmin(idAd);
        Swal.fire('Borrado', 'Administrador Borrado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al eliminar el administrador', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de eliminar este usuario?');
    // if (confirmacion) {
    //   this.dataAdm.deleteAdmin(idAdmin);
    // }
  }
  onDesactivarAdmin(idAdmin: UserInterface) {
    const idAd = idAdmin.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Desactivaras al administrador!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.dataAdm.desactivarAdmin(idAd);
        Swal.fire('Desactivado', 'Administrador desactivado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al desactivar el administrador', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de desactivar este usuario?');
    // if (confirmacion) {
    //   this.dataAdm.desactivarAdmin(uid);
    // }
  }
  onActivarAdmin(idAdmin: UserInterface) {
    const idAd = idAdmin.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Activaras al administrador!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.dataAdm.activarAdmin(idAd);
        Swal.fire('Activado', 'Administrador activado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al activar el administrador', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de activar este usuario?');
    // if (confirmacion) {
    //   this.dataAdm.activarAdmin(uid);
    // }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
