import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
declare var $: any;
import { ServiciosConfigService } from 'src/app/service/config/servicios_config/servicios-config.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  repartidores: UserInterface[] = [];

  lat: number;
  lng: number;
  init: boolean = false;
  siguiendoNombre: string = null;
  siguiendoA: string = null;
  uidUser: string = null;
  public usuario: any = {};

  public costos: any[];
  public tarifas: any[];
  public pagos: any[];

  public uidSucursal: string = null;

  constructor(private authService: AuthService,
              public db: AngularFirestore,
              public afs: AngularFireAuth,
              public _servicio_config: ServiciosConfigService,
              ) {
  }
  user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    direccion: '',
    // photoUrl: '',
    roles: {}
  };
  public providerId: string = 'null';
  menus: any;
  servicios: any;
  serviciosapp: any;

  ngOnInit() {
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
       this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        // this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        // this.user.username = user.displayName;
        // this.user.email = user.email;
        // this.user.photoUrl = user.photoURL;
        // this.providerId = user.providerData[0].providerId;
        this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe( data => {  
          this.usuario = data;
          this.uidSucursal = this.usuario.uidSucursal;
          console.log('BD', this.usuario);
          console.log('BD2', this.uidSucursal);
          this.getCosto(this.uidSucursal);
          this.getTarifa(this.uidSucursal);
          this.getPago(this.uidSucursal);
          this.getListMenu(this.uidUser);
          this.getListServicios(this.uidUser);
          this.getListServiciosApp(this.uidUser);
          this.db.collection('users', ref => ref.where('tipo', '==', 2)
            .where('uidSucursal', '==', this.uidSucursal) ).valueChanges()
            // tslint:disable-next-line:no-shadowed-variable
          .subscribe(( data: UserInterface[] ) => {
             console.log('repartidores', data);
             this.repartidores = data;
             if ( !this.init) {
             this.lat = data[0].geolocalizacion._lat;
             this.lng = data[0].geolocalizacion._long;
             this.init = true;
     }
     if ( this.siguiendoA) {
       data.forEach( repartidor => {
         if ( repartidor.uid  === this.siguiendoA ) {
           this.lat = repartidor.geolocalizacion._lat;
           this.lng = repartidor.geolocalizacion._long;
         }
       });
     }
   });
          if ( this.usuario.pago === 'Vencido') {
            $(document).ready(function() {
              $('#mostrarmodal').modal('show');
           });
          }
        });
        }
    });
    // const time = moment.duration(1557154847000).asMinutes();
    // const time2 = moment.duration(1557165647000).asMinutes();
    // const res = (time2 - time);
    // const hora = moment(res).format('HH:mm');
    //  const time = moment(1557139235000).hours();
    //  const horaxminut = time * 60;
    //  const time2 = moment(1557139235000).minutes();
    //  const suma = (horaxminut + time2) / time;
    // console.log('hora', time);
    // console.log('res', res);
    // console.log('format', hora);
    // console.log('hora', horaxminut);
    // console.log('minuto', time2);
    // console.log('minutos', suma);
    // const time2 = moment()
  }
 seguir( repartidor: UserInterface ) {
   this.siguiendoA = repartidor.uid;
   this.siguiendoNombre = repartidor.username;
  this.lat = repartidor.geolocalizacion._lat;
  this.lng = repartidor.geolocalizacion._long;
 }
 dejarDeSeguir() {
  this.siguiendoA = null;
  this.siguiendoNombre = null;
 }
 onLogout() {
  this.afs.signOut();
}
getCosto(uidSucursal) {
  this._servicio_config.getCostoFijo(uidSucursal).subscribe(costo => {
    this.costos = costo;
    console.log('costo', costo);
  });
}
getTarifa(uidSucursal) {
  this._servicio_config.getTarifaService(uidSucursal).subscribe( tarifa => {
    this.tarifas = tarifa;
    console.log('tarifa ', tarifa);
  });
}
getPago(uidSucursal) {
  this._servicio_config.getPagoService(uidSucursal).subscribe( pago => {
    this.pagos = pago;
    console.log('pago ', pago);
  });
}
getListMenu(uidUser) {
this.db.collection('menus', ref => ref.where('userUid', '==', uidUser).where('estado', '==', '1'))
.valueChanges().subscribe( m => {
  this.menus = m;
});
}
getListServicios(uidUser) {
  this.db.collection('servicios', ref => ref.where('uidRestaurante', '==', uidUser).where('estatus', '==', 'Terminado'))
  .valueChanges().subscribe( m => {
    this.servicios = m;
  });
  }
  getListServiciosApp(uidUser) {
    this.db.collection('servicios', ref => ref.where('uidRestaurante', '==', uidUser).where('abierto', '==', null)
    .where('estatus', '==', 'Terminado'))
    .valueChanges().subscribe( m => {
      this.serviciosapp = m;
      console.log('app', m.length);
    });
    }
}

