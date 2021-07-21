import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { PedidosService } from '../../../service/pedidos/pedidos.service';
import { Servicios} from '../../../models/pedidos';
import { UserInterface } from 'src/app/models/user';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-servicios',
  templateUrl: './list-servicios.component.html',
  styleUrls: ['./list-servicios.component.css']
})
export class ListServiciosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['clave', 'hora', 'usuario', 'tipo', 'estatus', 'detalle'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public pedidos: any;

  public usuarios: UserInterface[];

  filterPost = '';
  today = new Date();
  jsToday = '';
   // Sucursales
   uidUser: string = null;
   public usuario: any = {};
   Uidsucursal: String = '';
   user: UserInterface = {
     uid: '',
     username: '',
     email: '',
     direccion: '',
     uidSucursal: '',
     roles: {}
   };

  constructor(public _pedidoPro: PedidosService,
               public db: AngularFirestore,
               public authService: AuthService) {
    this.jsToday = formatDate(this.today, 'dd-MM-yyyy', 'en-US');
  }

  ngOnInit() {
    this.getAllUsuarios();
    // Sucursal
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe( data => {
          this.usuario = data;
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          this.getAllPedidos(this.Uidsucursal);
          console.log('usuer', this.Uidsucursal);
        });
        }
    });
  }
  
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getAllPedidos(uidSucursal) {
    console.log('uidsSer', uidSucursal);
    this.db.collection<Servicios>('servicios', ref =>
    ref
    .where('uidSucursal', '==', uidSucursal).orderBy('fecha', 'desc'))
    .valueChanges().subscribe( data => {
    const serv = data;
    const servicios =  [];
    serv.forEach(p => {
      if (
        p.estatus !== 'Cancelado' &&
        p.estatus !== 'Terminado' &&
        p.estatus !== 'creando' &&
        p.estatus !== 'Pagado'
      ) {
        servicios.push(p);
      }
    });
    // console.log("servicios_", servicios);
    this.pedidos = servicios;
    this.dataSource.data = servicios;
    });
  }

  getAllUsuarios() {
    this._pedidoPro.getAllUsuarios().subscribe( usuarios => {
      this.usuarios = usuarios;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
