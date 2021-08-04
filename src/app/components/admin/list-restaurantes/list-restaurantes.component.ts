import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  AfterViewInit
} from '@angular/core';
import { RestauranteDataService } from 'src/app/service/restaurante/restaurante-data.service';
import { FileRes } from '../../../models/file-res';
import { UserInterface } from '../../../models/user';
import { MapsAPILoader } from '@agm/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-list-restaurantes',
  templateUrl: './list-restaurantes.component.html',
  styleUrls: ['./list-restaurantes.component.css']
})
export class ListRestaurantesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['uid', 'username', 'email', 'phone', 'contacto', 'activo', 'edit', 'delete', 'status'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public restaurantes: any[];
  filterPost = '';
  pageActual = 1;
  // maps
  title = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  public geoCoder;
  public geoCoderF: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  // formulario
  @ViewChild('btnClose') btnClose: ElementRef;
  estaSobreElemento = false;
  archivos: FileRes[] = [];
  public email: string;
  public password: string;
  public username: string;
  public contacto: string;
  public phone: string;
  public categoria: string;
  public tipo = 3;
  public activo = true;
  public direccion: {};
  public hora_abierto: any;
  public hora_cerrar: any;
  // Para el listado
  public categorias: any[];
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
  // Imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImage1: any;

  // Listado de Categorías para visualizar en la tabla
  list_Categorias: any;

  constructor(
    public dataRes: RestauranteDataService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public authService: RestauranteDataService,
    public db: AngularFirestore,
    private alertService: AlertService,
    private storage: AngularFireStorage,
  ) {}

  ngOnInit() {
    this.categoriaList();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      setTimeout(() => {
        const autocomplete = new google.maps.places.Autocomplete(
          this.searchElementRef.nativeElement,
          {
            types: ['address'],
            componentRestrictions: { country: "mx" },
          }
        );
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            // set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 20;
            this.getAddress(this.latitude, this.longitude); 
          });
        });
      }, 1000);
    });
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
            this.getListRestaurante(this.Uidsucursal);
            console.log('usuer', this.Uidsucursal);
            this.db
              .collection('categoria_critico', ref =>
                ref
                  .where('uidSucursal', '==', this.Uidsucursal)
                  .orderBy('posicion', 'asc')
              )
              .valueChanges()
              .subscribe(categoria => {
                this.categorias = categoria;
                console.log('categoria', categoria);
              });
            // Desglose de tabla
            this.authService.getConvenios(this.Uidsucursal)
              .subscribe( res => (this.dataSource.data = res));
          });
      }
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getListRestaurante(uidSucursal) {
    console.log('uidsucu', uidSucursal);
    this.db
      .collection('users', ref =>
        ref.where('tipo', '==', 3).where('uidSucursal', '==', uidSucursal)
      )
      .valueChanges()
      .subscribe(data => {
        this.restaurantes = data;
        console.log('covenios', data);
      });
    JSON.stringify(this.restaurantes);
  }
  onDeleteRes(uid: UserInterface) {
    const idCo = uid.uid;
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminaras al convenio!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.dataRes.deleteRestaurante(idCo);
        Swal.fire('Eliminado', 'Convenio eliminado de la plataforma', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al eliminar el convenio', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de eliminar este usuario?');
    // if (confirmacion) {
    //   this.dataRes.deleteRestaurante(idRes);
    // }
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 20
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 20;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }
  markerDragEnd($event: any) {
    console.log('markdrag', $event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  // subir convenio
  cargarImagenes(formAdmin: NgForm) {
    // console.log('hora', this.hora_abierto);
    const abierto = moment(this.hora_abierto, 'HHmmss');
    console.log('este', abierto.format());
    console.log(abierto.format('HH:mm:ss'));
    const abiertoFormat = abierto.format('HH:mm:ss');
    const cerrar = moment(this.hora_cerrar, 'HHmmss');
    console.log(cerrar.format());
    console.log(cerrar.format('HH:mm:ss'));
    const cerrarFormat = cerrar.format('HH:mm:ss');
    if (
      this.email === '' ||
      this.password === '' ||
      this.username === '' ||
      this.contacto === '' ||
      this.address === '' ||
      this.phone === '' ||
      this.hora_cerrar === '' ||
      this.categoria === '' ||
      this.direccion === '' ||
      !this.urlImage
    ) {
      this.alertService.warning('Algunos campos no estan completos.');
    } else if (this.password.length < 7) {
      this.alertService.warning('La contraseña debe tener más de 7 caracteres');
    } else {
      this.direccion = new firebase.firestore.GeoPoint(
        this.latitude,
        this.longitude
      );
      this.authService.newRegister(
        abiertoFormat,
        cerrarFormat,
        this.email,
        this.password,
        this.username,
        this.contacto,
        this.address,
        this.phone,
        this.categoria,
        this.direccion,
        this.Uidsucursal,
        this.urlImage1
      );
      formAdmin.resetForm();
      // console.log('abierto', cerrar);
    }
  }
  // imagen
  onUpload(e) {
    console.log('subir', e);
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `users/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          ref.getDownloadURL().subscribe(r => {
            this.urlImage1 = this.urlImage = r;
            console.log('foto', r);
          })
        )
      )
      .subscribe();
  }
  onDesactivarConvenio(uid: UserInterface) {
    const idCo = uid.uid;
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Desactivaras al convenio!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.authService.desactivarConvenio(idCo);
        Swal.fire('Desactivado', 'Convenio desactivado de la plataforma', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al desactivar el convenio', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de desactivar este usuario?');
    // if (confirmacion) {
    //   this.authService.desactivarConvenio(uid);
    // }
  }
  onActivarConvenio(uid: UserInterface) {
    const idCo = uid.uid;
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Activaras al convenio!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this.authService.activarConvenio(idCo);
        Swal.fire('Activado', 'Convenio activado de la plataforma', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al activar el convenio', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de activar este usuario?');
    // if (confirmacion) {
    //   this.authService.activarConvenio(uid);
    // }
  }

  // trae todos las categorías
  categoriaList() {
    this.db
      .collection('categoria_critico')
      .valueChanges()
      .subscribe(cat => {
        this.list_Categorias = cat;
        console.log('cate', cat);
      });
  }

  onPreUpdateRestaurant(rest) {
    console.log('REST', rest);
    this.dataRes.isUserRestaurante = Object.assign({}, rest);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
