import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { UserInterface } from 'src/app/models/user';
import { AuthService } from '../../../service/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PedidosService } from '../../../service/pedidos/pedidos.service';
import { Servicios } from '../../../models/pedidos';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { MapsAPILoader } from '@agm/core';
import * as firebase from 'firebase';
import { AlertService } from 'ngx-alerts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';

// declare var google: any;

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css']
})
export class ListPedidosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['clave', 'hora', 'usuario', 'tipo', 'estatus', 'detalle'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  today = new Date();
  jsToday = '';
  public uidConvenio = '';
  public pedidos: Servicios[];
  usuarios: {};
  filterPost = '';
  filterPedido = '';
  public selectedPedido: Servicios = {};
  @ViewChild('btnClose') btnClose: ElementRef;
  public isAdmin: any = null;
  public estatus: string = 'BuscandoBme';
  // public repartidor: string = 'Buscando Repartidor';
  public uid: string;
  public time: any;
  uidSucursal: any;
  // user data login
  uidUser: string = null;
  public providerId: string = 'null';
  public usuario: any[] = [];
  direccionLocal: any;
  nombreLocal: any;
  pedidoGeo: any;
  pedido = {};
  producto = {};
  pedidoID: any;
  productoID: any;
  // maps
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  public geoCoder;
  public geoCoderF: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(public authService: AuthService,
    public afs: AngularFirestore,
    public pedidoServ: PedidosService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private alert: AlertService,
  ) {

    this.servicioCollection = afs.collection<Servicios>('servicios');
    this.jsToday = formatDate(this.today, 'dd-MM-yyyy', 'en-US');

  }
  public servicioCollection: AngularFirestoreCollection<Servicios>;
  user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    direccion: '',
    geolocalizacion: {},
    // photoUrl: '',
    roles: {}
  };
  ngOnInit() {
    this.getAllPedidosHoy();
    this.getAllUsuarios();
    // MAPS
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.providerId = user.providerData[0].providerId;
        this.afs.doc(`users/${this.uidUser}`).valueChanges().subscribe((data: any) => {
          this.usuarios = data;
          console.log('data', data);
          this.uidSucursal = data.uidSucursal;
          this.pedido = {
            direccionLocal: data.address,
            nombreLocal: data.username,
            pedidoGeo: new firebase.firestore.GeoPoint(data.direccion._lat, data.direccion._long)
            // servicioID: this.uid
          };
        });
      }
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getAllPedidosHoy() {
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
      //   this.afs.collection('servicios', ref =>
      //     ref
      //       .where('uidRestaurante', '==', this.uidConvenio)).valueChanges().subscribe(data => {
      //         this.pedidos = data;
      //         console.log('query', data);
      //       });
      }
    });
  }

  getAllUsuarios() {
    this.pedidoServ.getAllUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    console.log('markdrag', $event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  onSavePedido(formPedido: NgForm) {
    if (this.selectedPedido.cliente === '' || this.address === '' || this.selectedPedido.descripcion === '' ||
      this.selectedPedido.totalProductos === null || this.selectedPedido.notas === '') {
      this.alert.warning('Falta información en el formulario');
    } else {
      this.time = moment(this.today).format('x');
      this.authService.isAuth().subscribe(user => {
        if (user) {
          this.uidConvenio = this.user.uid = user.uid;
          // datos
          formPedido.value.uidRestaurante = this.uidConvenio;
          formPedido.value.estatus = this.estatus;
          formPedido.value.fecha = this.time;
          // formPedido.value.uidRepartidor = this.repartidor;
          formPedido.value.uidCliente = formPedido.value.cliente;
          formPedido.value.tipo = 2;
          formPedido.value.tipoTransporte = 'Motocicleta';
          formPedido.value.entregaDir = this.address;
          formPedido.value.metodo_pago = 'Efectivo';
          formPedido.value.abierto = 'Abierto plataforma';
          formPedido.value.numTikets = 0;
          formPedido.value.numPedidos = 1;
          formPedido.value.uidSucursal = this.uidSucursal;
          formPedido.value.entregaGeo = new firebase.firestore.GeoPoint(this.latitude, this.longitude);
          const des = formPedido.value.descripcion;
          console.log('des', des);
          const clave = moment().toArray();
          console.log(clave[5], clave[6]);
          const segundos = clave[5].toString();
          const milisegundos = clave[6].toString();
          const _clave = segundos + milisegundos;
          this.afs.collection('servicios').add(formPedido.value)
            .then(ref => {
              console.log('id', this.uid = ref.id);
              this.onPedido(this.uid, des);
              this.afs.collection('servicios').doc(this.uid).update({
                uid: this.uid,
                clave: _clave
              });
            });
          console.log('form', formPedido.value);
          this.btnClose.nativeElement.click();
          formPedido.resetForm();
          this.btnClose.nativeElement.click();
          this.alert.success('Servicio solicitado.');
        }
      });
    }
  }
  onPedido(servicioID, des) {
    console.log('des', des);
    this.afs.collection('pedidos').add(this.pedido)
      .then(ref => {
        console.log('idPEdido', this.pedidoID = ref.id);
        this.onProducto(des, servicioID, this.pedidoID);
        this.afs.collection('pedidos').doc(this.pedidoID).update({
          servicioID: servicioID
        });
      });
  }
  onProducto(desc, servicio, pedido) {
    this.producto = {
      cantidad: 1,
      descripcion: desc,
      servicioID: servicio,
      pedidoID: pedido
    };
    this.afs.collection('productos').add(this.producto)
      .then(ref => {
        console.log('productoID', this.productoID = ref.id);
        this.afs.collection('productos').doc(this.productoID).update({
          productoID: this.productoID
        });
      });
  }
  onCancelService(uid) {
    const confirmacion = confirm('¿Esta seguro de cancelar este servicio?');
    if (confirmacion) {
      this.afs.collection('servicios').doc(uid).update({
        estatus: 'Cancelado'
      }).then( () => {
        this.afs.collection('servicios').doc(uid).update({
          por: 'Convenio'
        });
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
