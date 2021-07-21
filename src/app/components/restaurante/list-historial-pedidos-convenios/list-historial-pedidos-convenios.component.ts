import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { PedidosService } from 'src/app/service/pedidos/pedidos.service';
import { Servicios } from 'src/app/models/pedidos';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../service/auth.service';
import { UserInterface } from 'src/app/models/user';
// import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-historial-pedidos-convenios',
  templateUrl: './list-historial-pedidos-convenios.component.html',
  styleUrls: ['./list-historial-pedidos-convenios.component.css']
})
export class ListHistorialPedidosConveniosComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['clave', 'tipo', 'estatus', 'fecha', 'nombreUsuario', 'totalNeto', 'detalle'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public pedidos: Servicios[];
  public usuarios: Servicios[];
  public pedidosCancel: Servicios[];
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
  public uidConvenio = '';


  constructor( public authService: AuthService, public _pedido: PedidosService, public afs: AngularFirestore ) { }
  user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    // photoUrl: '',
    direccion: '',
    geolocalizacion: {},
    roles: {}
  };
  ngOnInit() {
    // this.getAllPedidos();
    this.getAllHistorial();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

// Pedidos Terminados
  getAllHistorial() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidConvenio = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.afs.collection<Servicios>('servicios', ref =>
        ref
        .where('uidRestaurante', '==', this.uidConvenio).orderBy('fecha', 'desc'))
        .valueChanges().subscribe( data => {
        const serv = data;
        const servicios =  [];
        serv.forEach(p => {
          if (
            p.estatus === 'Cancelado' ||
            p.estatus === 'Terminado'
          ) {
            servicios.push(p);
          }
        });
        console.log("servicios_", servicios);
        this.pedidos = servicios;
        this.dataSource.data = servicios;
        });
  }
  });
  }

}