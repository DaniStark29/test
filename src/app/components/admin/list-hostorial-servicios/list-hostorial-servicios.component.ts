import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { PedidosService } from 'src/app/service/pedidos/pedidos.service';
import { Servicios } from 'src/app/models/pedidos';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInterface } from 'src/app/models/user';
import { AuthService } from '../../../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-hostorial-servicios',
  templateUrl: './list-hostorial-servicios.component.html',
  styleUrls: ['./list-hostorial-servicios.component.css']
})
export class ListHostorialServiciosComponent implements OnInit, AfterViewInit {
 
  displayedColumns: string[] = ['clave', 'tipo', 'estatus', 'fecha', 'nombreUsuario', 'totalNeto', 'detalle'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public pedidos: any[];
  public usuarios: Servicios[];
  public pedidosCancel: any[];
  public repartidores: Servicios[];
  filterPost = '';
  filterPost1 = '';
  filterPost2 = '';
  fechaInicio = '';
  fechaFin = '';
  date1: any;
  date2: any;
  listas: {};
  ver: boolean;
  // Sucursales
  uidUser: string = null;
  public usuario: any = {};
  Uidsucursal = '';
  user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    direccion: '',
    uidSucursal: '',
    roles: {}
  };
  constructor(
    public _pedido: PedidosService,
    public afs: AngularFirestore,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // this.getAllUsuarios();
    // this.getAllRepartidores();
    // Sucursal
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.afs
          .doc(`users/${this.uidUser}`)
          .valueChanges()
          .subscribe(data => {
            this.usuario = data;
            // tslint:disable-next-line:no-unused-expression
            this.Uidsucursal = this.usuario.uidSucursal;
            // this.getAllPedidos(this.Uidsucursal);
            // this.getAllPedidosCancel(this.Uidsucursal);
            console.log('usuer', this.Uidsucursal);
            this.getAllPedidos(this.Uidsucursal);
          });
      }
    });
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllPedidos(uidSucursal) {
    // console.log('uidsSer', uidSucursal);
    this.afs.collection<Servicios>('servicios', ref =>
    ref
    .where('uidSucursal', '==', uidSucursal).orderBy('fecha', 'desc'))
    .valueChanges().subscribe( data => {
    const serv = data;
    const servicios =  [];
    serv.forEach(p => {
      if (
        p.estatus === 'Cancelado' ||
        p.estatus === 'Terminado' ||
        p.estatus === 'Pagado'
      ) {
        servicios.push(p);
      }
    });
    console.log("servicios_", servicios);
    this.pedidos = servicios;
    this.dataSource.data = servicios;
    });
  }
  // getAllPedidos(uidSucursal) {
  //   this.afs
  //     .collection<Servicios>('servicios', ref =>
  //       ref.where('uidSucursal', '==', uidSucursal).orderBy('fecha', 'desc')
  //     )
  //     .valueChanges()
  //     .subscribe(data => {
  //       const serv = data;
  //       const servicios = [];
  //       serv.forEach(p => {
  //         if (p.estatus === 'Terminado' || p.estatus === 'Pagado') {
  //           servicios.push(p);
  //         }
  //       });
  //       console.log('servicios_', servicios);
  //       this.pedidos = servicios;
  //     });
  // }
  // pedidos cancelados
  // getAllPedidosCancel(uidSucursal) {
  //   this.afs
  //     .collection<Servicios>('servicios', ref =>
  //       ref
  //         .where('estatus', '==', 'Cancelado')
  //         .where('uidSucursal', '==', uidSucursal)
  //         .orderBy('fecha', 'desc')
  //     )
  //     .valueChanges()
  //     .subscribe(data => {
  //       this.pedidosCancel = data;
  //     });
  // }
  // getAllUsuarios() {
  //   this._pedido.getAllUsuarios().subscribe(usuarios => {
  //     this.usuarios = usuarios;
  //   });
  // }
  // getAllRepartidores() {
  //   this._pedido.getAllUsuarios().subscribe(repartidores => {
  //     this.repartidores = repartidores;
  //   });
  // }
  // fechas(fechaInicio, fechaFin) {
  //   this.ver = moment().isBetween(fechaInicio, fechaFin);
  //   console.log('verificacion', this.ver);
  //   if (this.ver === true) {
  //     console.log(
  //       'inicio',
  //       (this.date1 = moment(fechaInicio).format('x')),
  //       'fin',
  //       (this.date2 = moment(fechaFin).format('x'))
  //     );
  //     this.afs
  //       .collection('servicios', ref =>
  //         ref
  //           .orderBy('fecha')
  //           .startAt(this.date1)
  //           .endAt(this.date2)
  //           .where('estatus', '==', 'Terminado')
  //       )
  //       .valueChanges()
  //       .subscribe(data => {
  //         this.listas = data;
  //         console.log('query', this.listas);
  //       });
  //   } else {
  //     alert('Parece que no se encontraron registros.');
  //   }
  // }
  // fechas2(fechaInicio, fechaFin) {
  //   this.ver = moment().isBetween(fechaInicio, fechaFin);
  //   console.log('verificacion', this.ver);
  //   if (this.ver === true) {
  //     console.log(
  //       'inicio',
  //       (this.date1 = moment(fechaInicio).format('x')),
  //       'fin',
  //       (this.date2 = moment(fechaFin).format('x'))
  //     );
  //     this.afs
  //       .collection('servicios', ref =>
  //         ref
  //           .orderBy('fecha')
  //           .startAt(this.date1)
  //           .endAt(this.date2)
  //           .where('estatus', '==', 'Cancelado')
  //       )
  //       .valueChanges()
  //       .subscribe(data => {
  //         this.listas = data;
  //         console.log('query', this.listas);
  //       });
  //   } else {
  //     alert('Parece que no se encontraron registros.');
  //   }
  // }
}
