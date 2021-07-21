import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidosService } from '../../../service/pedidos/pedidos.service';
import { Pedidos, Servicios, Productos } from '../../../models/pedidos';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UserInterface } from 'src/app/models/user';
import { MenuInterface } from 'src/app/models/restaurante/menu';
import {} from 'googlemaps';
import { Http, Headers, RequestOptions } from '@angular/http';
import Swal from 'sweetalert2';

// declare var google: any;
@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  public servicio: Servicios = {};
  public pedido: any;
  public productos: any;
  public clientes: any;
  public repartidores: any;
  public convenios: any;
  public totalEstablecimientos: number;
  public totalSer_totalEst: number;

  public totalNet_totalEst: number;

  title: String = 'Track del servicio';

  public lat: Number = 24.799448;
  public lng: Number = 120.979021;

  public origin: any;
  public destination: any;
  public waypoints: any[];
  public renderOptions: any;

  public originJSlt: any;
  public originJSln: any;

  public dir: any;

  constructor(
    public _pedidoSer: PedidosService,
    public route: ActivatedRoute,
    public afs: AngularFirestore,
    public http: Http
  ) {}

  public geoPoints: any[];
  public total: any;
  public driving: any = 'DRIVING';
  public serviciosP: any;
  public respuesta: any;
  public datos: any;

  ngOnInit() {
    // this.getDirection(null, null, null);
    const idServicio = this.route.snapshot.params['uid'];
    this.getDetails(idServicio);
    this.getPedido(idServicio);
    this.getProducto(idServicio);

  }

  // // tslint:disable-next-line:use-life-cycle-interface
  // _ngAfterViewInit() {
  //   console.log("afterinit");
  //   setTimeout(() => {
  //     const idServicio = this.route.snapshot.params["uid"];
  //     this._pedidoSer.getOneServicio(idServicio).subscribe(servicio => {
  //       this._pedidoSer.getAllServiciosP(idServicio).subscribe(serviciosP => {
  //         console.log("ServiciosP", serviciosP);
  //         this.servicio = servicio;
  //         console.log("servicio Cordenadas", this.servicio);
  // // Coordendas donde se va entregar el pedido.
  // const _lat = this.servicio.entregaGeo._lat;
  // const _lng = this.servicio.entregaGeo._long;
  // console.log(this.destination);
  // // Coordendas donde se inicia el servicio
  // const lat = this.servicio.partidaGeo._lat;
  // const lng = this.servicio.partidaGeo._long;
  //         console.log(this.origin);
  //         const mapProperties = {
  //           center: new google.maps.LatLng(35.2271, -80.8431),
  //           zoom: 15,
  //           mapTypeId: google.maps.MapTypeId.ROADMAP
  //         };
  //         this.map = new google.maps.Map(
  //           this.mapElement.nativeElement,
  //           mapProperties
  //         );
  //         const directionsService = new google.maps.DirectionsService();
  //         const directionsDisplay = new google.maps.DirectionsRenderer({
  //           draggable: true,
  //           map: this.map
  //         });

  //         directionsDisplay.addListener("directions_changed", function() {
  //           let total = 0;
  //           const myroute = directionsDisplay.getDirections().routes[0];
  //           for (let i = 0; i < myroute.legs.length; i++) {
  //             total += myroute.legs[i].distance.value;
  //           }
  //           total = total / 1000;
  //           this.total = total + " km";
  //           console.log("Total: ", this.total);
  //         });

  //         const waypts = [];
  //         const checkboxArray = serviciosP;
  //         for (let i = 0; i < checkboxArray.length; i++) {
  //           waypts.push({
  //             location: new google.maps.LatLng(
  //               checkboxArray[i].partidaGeo._lat,
  //               checkboxArray[i].partidaGeo._long
  //             )
  //           });
  //         }
  //         console.log("Pruva", waypts);

  //         directionsService.route(
  //           {
  //             origin: new google.maps.LatLng(lat, lng),
  //             destination: new google.maps.LatLng(_lat, _lng),
  //             waypoints: waypts,
  //             travelMode: this.driving,
  //             avoidTolls: true
  //           },
  //           function(response, status) {
  //             if (status === "OK") {
  //               directionsDisplay.setDirections(response);
  //             } else {
  //               alert("Could not display directions due to: " + status);
  //             }
  //           }
  //         );
  //       });
  //     });
  //   }, 1000);
  // }
  // tslint:disable-next-line:use-life-cycle-interface
  // ngAfterViewInit() {
  //   console.log("afterinit");
  //   setTimeout(() => {
  //     const idServicio = this.route.snapshot.params["uid"];
  //     this._pedidoSer.getOneServicio(idServicio).subscribe(servicio => {
  //       this._pedidoSer.getAllServiciosP(idServicio).subscribe(serviciosP => {
  //         console.log("ServiciosP", serviciosP);
  //         this.servicio = servicio;
  //         console.log("servicio Cordenadas", this.servicio);
  //         // Coordendas donde se va entregar el pedido.
  //         const _lat = this.servicio.entregaGeo._lat;
  //         const _lng = this.servicio.entregaGeo._long;
  //         console.log(this.destination);
  //         // Coordendas donde se inicia el servicio
  //         const lat = this.servicio.partidaGeo._lat;
  //         const lng = this.servicio.partidaGeo._long;
  //         console.log(this.origin);
  //         const mapProperties = {
  //           center: new google.maps.LatLng(35.2271, -80.8431),
  //           zoom: 15,
  //           mapTypeId: google.maps.MapTypeId.ROADMAP
  //         };
  //         this.map = new google.maps.Map(
  //           this.mapElement.nativeElement,
  //           mapProperties
  //         );
  //         const directionsService = new google.maps.DirectionsService();
  //         const directionsDisplay = new google.maps.DirectionsRenderer({
  //           draggable: true,
  //           map: this.map
  //         });

  //         directionsDisplay.addListener("directions_changed", function() {
  //           let total = 0;
  //           const myroute = directionsDisplay.getDirections().routes[0];
  //           for (let i = 0; i < myroute.legs.length; i++) {
  //             total += myroute.legs[i].distance.value;
  //           }
  //           total = total / 1000;
  //           this.total = total + " km";
  //           console.log("Total: ", this.total);
  //         });

  //         const waypts = [];
  //         const checkboxArray = serviciosP;
  //         for (let i = 0; i < checkboxArray.length; i++) {
  //           waypts.push({
  //             lat: checkboxArray[i].partidaGeo._lat,
  //             lng: checkboxArray[i].partidaGeo._long
  //           });
  //         }
  //         console.log("Pruva", waypts);
  //         const lineSymbol = {
  //           path: "M 0,-1 0,1",
  //           strokeOpacity: 1,
  //           scale: 4
  //         };
  //         const flightPath = new google.maps.Polyline({
  //           path: waypts,
  //           icons: [
  //             {
  //               icon: lineSymbol,
  //               offset: "0",
  //               repeat: "20px"
  //             }
  //           ],
  //           strokeOpacity: 1.0
  //         });

  //         flightPath.setMap(this.map);
  //       });
  //     });
  //   }, 1000);
  // }
  // tslint:disable-next-line:use-life-cycle-interface ->codigo funcionando
  ngAfterViewInit() {
    console.log('afterinit');
    setTimeout(() => {
      const idServicio = this.route.snapshot.params['uid'];
      console.log('ID del Servicio', idServicio);
      this._pedidoSer.getOneServicio(idServicio).subscribe(servicio => {
        this._pedidoSer.getAllServiciosP(idServicio).subscribe(serviciosP => {
          console.log('ServiciosP', serviciosP);
          this.servicio = servicio;
          console.log(this.origin);
          // Coordendas donde se va entregar el pedido.
          const _lat = this.servicio.entregaGeo._lat;
          const _lng = this.servicio.entregaGeo._long;
          console.log(this.destination);
          // Coordendas donde se inicia el servicio
          const lat = this.servicio.partidaGeo._lat;
          const lng = this.servicio.partidaGeo._long;
          console.log('servicio Cordenadas', this.servicio);

          const waypts = [];
          const checkboxArray = serviciosP;
          this.serviciosP = checkboxArray;
          for (let i = 0; i < checkboxArray.length; i++) {
            const latlng =
              checkboxArray[i].partidaGeo._lat +
              ',' +
              checkboxArray[i].partidaGeo._long;
            waypts.push(latlng);
            // Se asigan estas variables para poder centar el mapa
            this.originJSlt = checkboxArray[i].partidaGeo._lat;
            this.originJSln = checkboxArray[i].partidaGeo._long;
          }
          const ruts = waypts.join('|');
          const _ruts = serviciosP;
          console.log('Pruva', ruts);
          const headers = new Headers({
            'Content-Type': 'application/json'
          });
          const options = new RequestOptions({
            headers: headers
          });
          const url =
            'https://roads.googleapis.com/v1/snapToRoads?path=' +
            ruts +
            '&interpolate=true&key=AIzaSyDhkHiz_LkMhVCfTsGJajw5Ag4u9d6ah2I';
          this.http.get(url, options).subscribe(res => {
            const mapProperties = {
              center: new google.maps.LatLng(this.originJSlt, this.originJSln),
              zoom: 17,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(
              this.mapElement.nativeElement,
              mapProperties
            );
            const directionsService = new google.maps.DirectionsService();
            const directionsDisplay = new google.maps.DirectionsRenderer({
              draggable: true,
              map: this.map
            });

            directionsDisplay.addListener('directions_changed', () => {
              let total = 0;
              const myroute = directionsDisplay.getDirections().routes[0];
              for (let i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
              }
              total = total / 1000;
              this.total = total + ' km';
              console.log('Total: ', this.total);
            });

            const _waypts = [];
            const _checkboxArray = _ruts;
            for (let i = 0; i < _checkboxArray.length; i++) {
              _waypts.push({
                location: new google.maps.LatLng(
                  _checkboxArray[i].partidaGeo._lat,
                  _checkboxArray[i].partidaGeo._long
                )
              });
            }
            console.log('Pruva2', _waypts);

            // directionsService.route(
            //   {
            //     origin: new google.maps.LatLng(
            //       37.33570507,
            //       -122.02342902
            //     ),
            //     destination: new google.maps.LatLng(
            //       37.33165083,
            //       -122.03029752
            //     ),
            //      waypoints: _waypts,
            //     travelMode: this.driving,
            //     avoidTolls: true
            //   },
            //   function(response, status) {
            //     if (String(status) === 'OK') {
            //       directionsDisplay.setDirections(response);
            //     } else {
            //       alert(
            //         'Could not display directions due to: ' + status
            //       );
            //     }
            //   }
            // );

            this.respuesta = res;
            const datos = JSON.parse(this.respuesta._body);
            console.log('datos1: ', JSON.parse(this.respuesta._body));
            console.log('datos2: ', datos.snappedPoints.length);
            const snappedCoordinates = [];
            const placeIdArray = [];
            const polylines = [];
            for (let i = 0; i < datos.snappedPoints.length; i++) {
              const latlng = new google.maps.LatLng(
                datos.snappedPoints[i].location.latitude,
                datos.snappedPoints[i].location.longitude
              );
              snappedCoordinates.push(latlng);
              placeIdArray.push(datos.snappedPoints[i].placeId);
            }
            const snappedPolyline = new google.maps.Polyline({
              path: snappedCoordinates,
              strokeColor: 'red',
              strokeWeight: 3
            });

            const marker = new google.maps.Marker({
              icon: '../../../../assets/imgs/punterocasa.png',
              position: new google.maps.LatLng(
                this.originJSlt,
                this.originJSln
              ),
              map: this.map,
              title: 'Lugar de entrega'
            });
            snappedPolyline.setMap(this.map);
            polylines.push(snappedPolyline);
          });
        });
      });
    }, 1000);
  }
  computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    this.total = total + ' km';
    console.log('Total: ', this.total);
  }

  getDetails(uid: string): void {
    this._pedidoSer.getOneServicio(uid).subscribe(servicio => {
      this.servicio = servicio;
      // tslint:disable-next-line: no-unused-expression
      this.totalEstablecimientos = this.servicio.numPedidos * 15;
      const toSer = Number.parseFloat(this.servicio.totalServicio);
      this.totalSer_totalEst = this.totalEstablecimientos + toSer;
      const toNet = Number.parseFloat(this.servicio.totalNeto);
      this.totalNet_totalEst = this.totalEstablecimientos + toNet;


      const idCliente = this.servicio.uidCliente;
      const idRepartidor = this.servicio.uidRepartidor;
      const convenio = this.servicio.uidRestaurante;

      this.getCliente(idCliente);
      this.getRepartidor(idRepartidor);
      this.getConvenio(convenio);
      // console.log('tabla servicio', this.servicio);
      // Coordendas donde se va entregar el pedido.
      this.destination = {
        lat: this.servicio.entregaGeo._lat,
        lng: this.servicio.entregaGeo._long
      };
      console.log(this.destination);
      // Coordendas donde se inicia el servicio
      this.origin = {
        lat: this.servicio.partidaGeo._lat,
        lng: this.servicio.partidaGeo._long
      };
      console.log(this.origin);
      // const uidServicio = this.servicio.uid;
      // this.getListPedido();
    });
  }
  getPedido(idServicio): void {
    this._pedidoSer.getPedidos(idServicio).subscribe( pedido => {
      this.pedido = pedido;
      // this.dir = 'https://maps.google.com/?q=' + this.pedido.pedidoGeo._lat + ',' + this.pedido.pedidoGeo._long;
      // this.dir = 'Hola Mundo';
      console.log('pedido1', this.dir);
    });
  }
  getProducto(idServicio): void {
    this._pedidoSer.getProducto(idServicio).subscribe( producto => {
      this.productos = producto;
      console.log('producto2', this.productos);
    });
  }

  getCliente(id): void {
    this._pedidoSer.getCliente(id).subscribe( cliente => {
      this.clientes = cliente;
      // console.log('cliente', this.clientes);
    });
  }
  getRepartidor(id): void {
    this._pedidoSer.getRepartidor(id).subscribe( repa => {
      this.repartidores = repa;
      // console.log('reapas', this.repartidores);
    });
  }
  getConvenio(id): void {
    this._pedidoSer.getConvenio(id).subscribe( conv => {
      this.convenios = conv;
      // console.log('reapas', this.repartidores);
    });
  }
  // getDirection(latConvenio, lngConvenio, pedidos) {
  //   // si es un servicio de convenio
  //   if (latConvenio) {
  //     this.waypoints = [
  //       {
  //         location: { lat: latConvenio, lng: lngConvenio },
  //         stopover: false
  //       }
  //     ];
  //     console.log("estoy en el si");
  //     // Cuando es un servicio regular
  //   } else {
  //     console.log("estoy en el no");
  //     console.log("mia de nadie mas", pedidos);
  //     if (pedidos && latConvenio == null) {
  //       for (const pedido of pedidos) {
  //         const lat = pedido.pedidoGeo._lat;
  //         console.log("pedido lat", lat);
  //         const long = pedido.pedidoGeo._long;
  //         console.log("pedido long", long);
  //         this.waypoints = [
  //           {
  //             location: { lat: lat, lng: long },
  //             stopover: false
  //           }
  //         ];
  //       }
  //     } else {
  //       console.log(" Pues me cambio");
  //     }
  //   }
  //   this.renderOptions = {
  //     suppressMarkers: true
  //   };
  // }


  changeStatus(serviciosUId, status: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Cambiaras el estado del servicio`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar'
    }).then( result => {
      if ( result.value ) {
        this.afs
        .collection('servicios')
        .doc(serviciosUId)
        .update({
          estatus: status
        });
        Swal.fire('Estado', 'Servicio cambiado de estado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al cabiar de esyatad el banner', 'error');
 });

  //   const confirma = confirm(
  //     '¿Seguro de cambiar el estado de este servicio a ' + status + '?'
  //   );
  //   if (confirma) {
  //     this.afs
  //       .collection('servicios')
  //       .doc(serviciosUId)
  //       .update({
  //         estatus: status
  //       });
  //   }
  }
}
