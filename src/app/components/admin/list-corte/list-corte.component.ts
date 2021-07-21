import { Component, OnInit } from '@angular/core';
import { CortesService } from 'src/app/service/corte/cortes.service';
import { UserInterface } from 'src/app/models/user';
import { AngularFirestore} from '@angular/fire/firestore';
import { Servicios } from '../../../models/pedidos';
import { PedidosService } from 'src/app/service/pedidos/pedidos.service';
import * as moment from 'moment';
import { Cortes } from 'src/app/models/cortes';
import { AuthService } from '../../../service/auth.service';
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
// import { auth } from 'firebase/app';
declare var $: any;


@Component({
  selector: 'app-list-corte',
  templateUrl: './list-corte.component.html',
  styleUrls: ['./list-corte.component.css']
})
export class ListCorteComponent implements OnInit {
  // Para extraer el uid del repartidor y enviarlo al modal
  public convenioUid: string = null;

  public repartidores: any[];
  public convenios: any[];
  public cortes: Cortes[];
  servicios: Servicios[];
  services: any;
  servicesFiltro: any;
  filterPost = '';
  filterPost2 = '';
  pageActual: number = 1;
  fechaInicio: '';
  fechaFin: '';
  fechaInicioC: '';
  fechaFinC: '';

  date1: any;
  date2: any;
  ver: boolean;
  listasServicios: any;
  listasServiciosConvenio: Servicios[];
  // Listado de convenios
  listasServiciosConvenio1: Servicios[];
  sumaCorteRep2: number;
  sumaCorteBme2: number;
  // Servicios en efectivo de convenio
  listasServiciosConvenio1Efectivo: Servicios[];
  totalServicioEfec2: number;
  totalCorteEfecRep2: number;
  totalCorteEfecBme2: number;
  // Servicios en tarjeta de convenio
  listasServiciosConvenio1Tarjeta: Servicios[];
  totalServicioTar2: number;
  totalCorteTarRep2: number;
  totalCorteTarBme2: number;
  // suma total
  sumaCorteRep: number;
  sumaCorteBme: number;

  // Tarjeta suma convenio
  listasTarjetaConvenio: Servicios[];
  sumaTotalServicioTarjetaConvenio: number;
  sumaTotalCorteTarjetaConvenio: number;
  sumaTotalBmeTarjetaConvenio: number;

  // Eefectivo suma convenio
  listasEfectivoConvenio: Servicios[];
  sumaTotalServicioEfectivoConvenio: number;
  sumaTotalCorteEfectivoConvenio: number;
  sumaTotalBmeEfectivoConvenio: number;

  // Tarjeta suma
  listasTarjeta: Servicios[];
  totalServicioTar: number;
  totalCorteTarRep: number;
  totalCorteTarBme: number;
  // Eefectivo suma
  listasEfectivo: Servicios[];
  totalServicioEfec: number;
  totalCorteEfecRep: number;
  totalCorteEfecBme: number;
  //
  public uidConvenio: '';
  public uidBme: '';
  public SumaCorte: number;
  public sumaCorteConvenio: number;
  public sumaBme: number;
  public sumaBmeConvenio: number;
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

  public usuarios: UserInterface[];

  // Convenio
  public serviciosConvenio: Servicios[];

  totalComisionEfec: any;
  totalRepaEfec: any;
  totalBmEfec: any;
  totalComisionTar: any;
  totalRepaTar: any;
  totalBmTar: any;
  totEfectCon: any;
  totalRepaCon: any;
  totalBmCon: any;
  bmeTePaga: any;
  tuDebes: any;
  tuCorte: any;
  saldoFavor: any;

  constructor( public corte: CortesService,
               public afs: AngularFirestore,
               public http: Http,
               public _pedidoPro: PedidosService,
               public auth: AuthService) {

  }

  ngOnInit() {
    // this.getUidConvenio(this.uidConvenio);
    this.getAllUsuarios();
    this.getAllCortes();
    // Sucursal
    console.log('user', this.user);
    this.auth.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.afs.doc(`users/${this.uidUser}`).valueChanges().subscribe( data => {
          this.usuario = data;
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          this.getListRepartidores(this.Uidsucursal);
          this.getListConvenios(this.Uidsucursal);
          console.log('usuer', this.Uidsucursal);
        });
        }
    });
  }
   getListRepartidores(uidSucursal) {
    this.afs.collection<UserInterface>('users', ref => ref.where('tipo', '==', 2)
    .where('uidSucursal', '==', uidSucursal))
    .valueChanges().subscribe( data => {
      this.repartidores = data;
    });
   }

   getListConvenios(uidSucursal) {
    this.afs.collection<UserInterface>('users', ref => ref.where('tipo', '==', 3)
    .where('uidSucursal', '==', uidSucursal))
    .valueChanges().subscribe( data => {
      this.convenios = data;
      console.log('convenios', data);
    });
  }
  getListServicios(uidRepartidor) {
    const url = `https://proyectosinternos.com/bm/bm/index.php/corterepa/${uidRepartidor}`;
    this.http.get(url).subscribe(res => {
      this.services = res.json().consulta;
      console.log('Reporte Respuesta: ', this.services);
      
        // if (this.servicios.length != 0) {
        //   this.res= true;
        //   console.log("Este es el RES: ", this.res);
          
        //   var totalEfec = 0;
        //   var totalTar = 0;
        //   for( let ser of this.servicios){
        //     if (ser.metodo_pago=="Efectivo") {
        //       // console.log("total de los: ", ser.metodo_pago);
        //       totalEfec += parseFloat(ser.totalProd);       
        //     }
        //     if (ser.metodo_pago=="Tarjeta") {
        //       totalTar += parseFloat(ser.totalProd);       
              
        //     }                               
        //   }

        //   this.totalTarjeta = totalTar;
        //   console.log("Total de los Tarjetas: ", this.totalTarjeta);

        //   this.totalEfectivo = totalEfec;
        //   console.log("Total de los Efectivos: ", this.totalEfectivo);

          
                   
        // this.totalServicios= this.servicios.reduce((acc, obj) => acc + parseFloat(obj.totalFinal), 0);  
        // console.log("Total de los servicios: ", this.totalServicios);
        
        // // let valor = this.servicios.length;
        
        // this.totalBringme = this.servicios.reduce((acc1, obj1) => acc1 + parseFloat(obj1.corteBme), 0);  
        // console.log("Total de los bringme: ", this.totalBringme);

        // this.totalRepa = this.servicios.reduce((acc, obj) => acc + parseFloat(obj.corteRep), 0); 
        // console.log("Total de los repartidor: ", this.totalRepa);

        // this.totalFinal = ((parseFloat(this.totalRepa)) + (parseFloat(this.totalEfectivo))) 
        // console.log("Final ganancias: ", this.totalFinal);
        

        // // this.totalProductos = this.servicios.reduce((acc, obj) => acc + parseFloat(obj.totalProductos), 0);  
        // // console.log("Total de los productos: ", this.totalProductos);

        
        // } else{
        //   this.res= false;
        //   console.log("Este es el RES: ", this.res);
        // }              
      // console.log("Este es el total de servicios: ", this.servicios);      
    });
//  this.afs.collection<Servicios>('servicios', ref =>
//  ref.where('uidRepartidor', '==', uidRepartidor).where('estatus', '==', 'Terminado'))
//  .valueChanges().subscribe( data => {
//    this.servicios = data;
   this.uidBme = uidRepartidor;
//   console.log(data);
//  });
  }
  getAllUsuarios() {
    this._pedidoPro.getAllUsuarios().subscribe( usuarios => {
      this.usuarios = usuarios;
    });
  }
  // Corte de repartidor
  corteFiltro (fechaInicio, fechaFin) {
    this.date1 = moment(fechaInicio).format('x');
    this.date2 = moment(fechaFin).format('x');

  const url = `https://proyectosinternos.com/bm/bm/index.php/corterepa/obtener_cobro/${this.date1}/${this.date2}/${this.uidBme}`;
    this.http.get(url).subscribe(res => {
      this.listasServicios = res.json().consulta;
      console.log('Reporte Respuesta con filtros de fechas: ', this.listasServicios);

          var totalComisionEfec = 0;
          var totalRepaEfec = 0;
          var totalBmEfec = 0;
          var totalComisionTar = 0;
          var totalRepaTar = 0;
          var totalBmTar = 0;
          var totEfectCon = 0;
          var totalRepaCon = 0;
          var totalBmCon = 0;
          for( let ser of this.listasServicios){
            if (ser.regular == "true") {
              if(ser.metodo_pago=="Efectivo"){
                totalComisionEfec += parseFloat(ser.comisionServicio);
                totalRepaEfec += parseFloat(ser.corteRep);
                totalBmEfec += parseFloat(ser.corteBme);
              }
              if (ser.metodo_pago == "Tarjeta") {
                totalComisionTar += parseFloat(ser.comisionServicio);
                totalRepaTar += parseFloat(ser.corteRep);
                totalBmTar += parseFloat(ser.corteBme);
              }            }
            if (ser.regular=="false") {
              if(ser.metodo_pago == "Efectivo"){
                totEfectCon += parseFloat(ser.comisionServicio);
                totalRepaCon += parseFloat(ser.corteRep);
                totalBmCon += parseFloat(ser.corteBme);
              }
            }
          }
          this.totalComisionEfec = totalComisionEfec;
          console.log("Este es el total de efectivo servicios regulares: ", this.totalComisionEfec);
          
          this.totalRepaEfec = totalRepaEfec;
          this.totalBmEfec = totalBmEfec;
          this.totalComisionTar = totalComisionTar;
          this.totalRepaTar = totalRepaTar;
          this.totalBmTar = totalBmTar;
          this.totEfectCon = totEfectCon;
          this.totalRepaCon = totalRepaCon;
          this.totalBmCon = totalBmCon;
          this.bmeTePaga = this.totalRepaTar;
          this.tuDebes = (this.totalBmEfec + this.totalBmCon);
          this.tuCorte = (this.totalRepaEfec + this.totalRepaTar + totalRepaCon);
          this.saldoFavor = (this.tuCorte - (this.tuDebes + this.totalBmTar));
    });


  // console.log(fechaInicio, fechaFin, this.uidBme);
  //   this.ver = moment().isBetween(fechaInicio, fechaFin);
  //     console.log('verificacion', this.ver);
  //   if (  this.ver === true && this.uidBme ) {
  //    console.log('Primer filtro', this.date1 = moment(fechaInicio).format('x'), 'fin', this.date2 = moment(fechaFin).format('x'));
  //   this.afs.collection('servicios', ref =>
  //   ref.orderBy('fecha', 'asc').startAt(this.date1).endAt(this.date2)
  //   .where('abierto', '==', null).where('estatus', '==', 'Terminado')
  //   .where('uidRepartidor', '==', this.uidBme )).valueChanges().subscribe(data => {
  //     this.listasServicios = data;
  //      console.log('Lista servicios tipo 1', this.listasServicios);
  //     // Suma de los cortes del repartidor
  //     this.sumaCorteRep = this.listasServicios.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteRep),
  //     0);
  //     console.log('sumaCorteRep', this.sumaCorteRep);
  //     // Suma de los cortes del repartidor
  //     this.sumaCorteBme = this.listasServicios.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteBme),
  //     0);
  //     console.log('sumaCorteBme', this.sumaCorteBme);
  //     // Servicios de convenio hechos por los repartidores
  //   console.log('inicio', this.date1 = moment(fechaInicio).format('x'), 'fin', this.date2 = moment(fechaFin).format('x'));
  //   this.afs.collection('servicios', ref =>
  //   ref.orderBy('fecha', 'asc').startAt(this.date1).endAt(this.date2)
  //   .where('abierto', '==', 'Abierto plataforma').where('estatus', '==', 'Terminado')
  //   .where('uidRepartidor', '==', this.uidBme )).valueChanges().subscribe(data2 => {
  //     this.listasServiciosConvenio1 = data2;
  //     console.log('querySerConv', this.listasServiciosConvenio1);
  //     // Suma de los cortes del repartidor
  //     this.sumaCorteRep2 = this.listasServiciosConvenio1.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteRep),
  //     0);
  //     // Suma de los cortes del repartidor
  //     this.sumaCorteBme2 = this.listasServiciosConvenio1.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteBme),
  //     0);
  //   });
  //   // Servicios de convenio hechos por los repartidores en efectivo
  //   console.log('inicio', this.date1 = moment(fechaInicio).format('x'), 'fin', this.date2 = moment(fechaFin).format('x'));
  //   this.afs.collection('servicios', ref =>
  //   ref.orderBy('fecha', 'asc').startAt(this.date1).endAt(this.date2)
  //   .where('abierto', '==', 'Abierto plataforma').where('estatus', '==', 'Terminado')
  //   .where('uidRepartidor', '==', this.uidBme ).where('metodo_pago', '==', 'Efectivo')).valueChanges().subscribe(data2 => {
  //     this.listasServiciosConvenio1Efectivo = data2;
  //     // console.log('querySerConv', this.listasServiciosConvenio1Efectivo);
  //     // Suma total de los servicios del repartidor
  //     this.totalServicioEfec2 = this.listasServiciosConvenio1Efectivo.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.totalServicio),
  //     0);
  //     // Suma total de los corte del repartidor en efectivo
  //     this.totalCorteEfecRep2 = this.listasServiciosConvenio1Efectivo.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteRep),
  //     0);
  //     // Suma total de los corte del repartidor en efectivo
  //     this.totalCorteEfecBme2 = this.listasServiciosConvenio1Efectivo.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteBme),
  //     0);
  //   });
  //   // Registros de solo tarjeta de convenio
  //   console.log('inicio', this.date1 = moment(fechaInicio).format('x'), 'fin', this.date2 = moment(fechaFin).format('x'));
  //   this.afs.collection('servicios', ref =>
  //   ref.orderBy('fecha').startAt(this.date1).endAt(this.date2).where('tipo', '==', 'Abierto plataforma').where('estatus', '==', 'Terminado')
  //   .where('metodo_pago', '==', 'Tarjeta')
  //   .where('uidRepartidor', '==', this.uidBme )).valueChanges().subscribe(data1 => {
  //   this.listasServiciosConvenio1Tarjeta = data1;
  //   // console.log('query Tarjeta', this.listasServiciosConvenio1Tarjeta);
  //   // Suma total de los servicios del repartidor
  //   this.totalServicioTar2 = this.listasServiciosConvenio1Tarjeta.reduce((
  //     acc,
  //     obj,
  //   ) => acc + (obj.totalServicio),
  //   0);
  //   // Suma total de los corte del repartidor en efectivo
  //   this.totalCorteTarRep2 = this.listasServiciosConvenio1Tarjeta.reduce((
  //     acc,
  //     obj,
  //   ) => acc + (obj.corteRep),
  //   0);
  //   // Suma total de los corte del repartidor en efectivo
  //   this.totalCorteTarBme2 = this.listasServiciosConvenio1Tarjeta.reduce((
  //     acc,
  //     obj,
  //   ) => acc + (obj.corteBme),
  //   0);

  // });
  //     // Registros de solo tarjeta
  //     console.log('inicio', this.date1 = moment(fechaInicio).format('x'), 'fin', this.date2 = moment(fechaFin).format('x'));
  //     this.afs.collection('servicios', ref =>
  //     ref.orderBy('fecha').startAt(this.date1).endAt(this.date2).where('abierto', '==', null)
  //     .where('estatus', '==', 'Terminado')
  //     .where('metodo_pago', '==', 'Tarjeta')
  //     .where('uidRepartidor', '==', this.uidBme )).valueChanges().subscribe(data1 => {
  //     this.listasTarjeta = data1;
  //     // console.log('query Tarjeta', this.listasTarjeta);
  //     // Suma total de los servicios del repartidor
  //     this.totalServicioTar = this.listasTarjeta.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.totalServicio),
  //     0);
  //     // Suma total de los corte del repartidor en efectivo
  //     this.totalCorteTarRep = this.listasTarjeta.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteRep),
  //     0);
  //     // Suma total de los corte del repartidor en efectivo
  //     this.totalCorteTarBme = this.listasTarjeta.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteBme),
  //     0);

  //   });
  //   // Registros de solo efectivo
  //     console.log('inicio', this.date1 = moment(fechaInicio).format('x'), 'fin', this.date2 = moment(fechaFin).format('x'));
  //     this.afs.collection('servicios', ref =>
  //     ref.orderBy('fecha').startAt(this.date1).endAt(this.date2).where('abierto', '==', null)
  //     .where('estatus', '==', 'Terminado')
  //     .where('metodo_pago', '==', 'Efectivo')
  //     .where('uidRepartidor', '==', this.uidBme )).valueChanges().subscribe(data2 => {
  //     this.listasEfectivo = data2;
  //     // console.log('query Efectivo', this.listasEfectivo);
  //     // Suma total de los servicios del repartidor
  //     this.totalServicioEfec = this.listasEfectivo.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.totalServicio),
  //     0);
  //     // Suma total de los corte del repartidor en efectivo
  //     this.totalCorteEfecRep = this.listasEfectivo.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteRep),
  //     0);
  //     // Suma total de los corte del repartidor en efectivo
  //     this.totalCorteEfecBme = this.listasEfectivo.reduce((
  //       acc,
  //       obj,
  //     ) => acc + (obj.corteBme),
  //     0);
  //   });
  //     });
    // } else {
    //   alert('Parece que no se encontraron registros.');
    // }
  }

  getAllCortes() {
    this.corte.getAllCortes().subscribe( cortes => {
      this.cortes = cortes;
    });
  }
  darBaja(uid) {
    const confirmacion = confirm('¿Estas seguro de dar de baja a este convenio?');
  if ( confirmacion ) {
    this.auth.vencido(uid);
  }
  }

  darAlta(uid) {
    const confirmacion = confirm('¿Estas seguro de activar este convenio?');
    if ( confirmacion ) {
      this.auth.habil(uid);
    }
  }
  getUidConvenio(uid) {
    console.log('uidConevnio', uid);
    this.uidConvenio = uid;
    this.corte.getCorteUidConvenio(uid);
  }
}

