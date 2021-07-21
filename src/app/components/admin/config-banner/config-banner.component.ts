import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BannerConfigService } from '../../../service/config/banner_config/banner-config.service';
import * as moment from 'moment';
import { UserInterface } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
// import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';

// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-config-banner',
  templateUrl: './config-banner.component.html',
  styleUrls: ['./config-banner.component.css']
})
export class ConfigBannerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['descripcion', 'fecha', 'modulo', 'ba', 'photourl', 'url', 'estado', 'delete'];
  dataSource = new MatTableDataSource();

  // tslint:disable-next-line: max-line-length
  public selectedBanner: BannerInterface = { nombreArchivo: null, archivo: null, photourl: null, estaSubiendo: null, progreso: null, url: null
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  archivos: BannerInterface[] = [];
  estaSobreElemento = false;
  @ViewChild('btnClose') btnClose: ElementRef;

  // Sucursales
  uidUser: string = null;
  public usuario: any = {};
  Uidsucursal: string = null;
  user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    direccion: '',
    uidSucursal: '',
    roles: {}
  };
  public banners: any;
  // Imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImage1: any;

  constructor( public _bannerConfg: BannerConfigService,
               public authService: AuthService,
               public db: AngularFirestore,
               private alertService: AlertService,
              private storage: AngularFireStorage
               ) { }

    // public BannersCollection: AngularFirestoreCollection<BannerInterface>;
    // public Banners: Observable<BannerInterface[]>;

  ngOnInit() {
    // Sucursal
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe( data => {
          this.usuario = data;
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          // this.BannersCollection = this.db.collection<any>('banners', ref => ref.where('uidSucursal', '==', this.Uidsucursal));
          // this.Banners = this.BannersCollection.valueChanges();
          // this.db.collection('banners', ref => ref.where('uidSucursal', '==', this.Uidsucursal)).valueChanges().subscribe( b => {
          //   this.banners = b;
          //   console.log('banners', b);
          //           });
          // console.log('usuer', this.Uidsucursal);
          // Desglose de tablas
          this._bannerConfg.getBanner(this.Uidsucursal)
            .subscribe( res => (this.dataSource.data = res ));
        });
        }
    });
    // this.getListBanner();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onSaveMenu(formMenu: NgForm) {
// Enviando datos del formulario al servicio
if (this.selectedBanner.descripcion === '' || this.selectedBanner.fecha === '' ||
 this.selectedBanner.modulo === '' || !this.urlImage1 ) {
this.alertService.warning('Algunos campos no fueron completados.');
} else {
  this._bannerConfg.guardarImagen(this.urlImage1,
     this.selectedBanner.descripcion, this.selectedBanner.fecha, this.selectedBanner.estado,
    this.selectedBanner.modulo, this.Uidsucursal, this.selectedBanner.url);
}
  formMenu.resetForm();
  this.btnClose.nativeElement.click();
  }

  onUpload(e) {
    console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `banners/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() =>
    ref.getDownloadURL().subscribe( r => {
     this.urlImage1 = this.urlImage = r;
      console.log('foto', r);
    })
    )
    )
    .subscribe();
  }
  // getListBanner() {
  //   this.getAllBanners().subscribe( banners =>  {
  //     this.banners = banners;
  //     console.log('banners', banners);
  //   });
  // }
  // getAllBanners() {
  //   return this.Banners = this.BannersCollection.snapshotChanges()
  //   .pipe(map( changes => {
  //     return changes.map( action => {
  //       const data = action.payload.doc.data() as BannerInterface;
  //       data.uid = action.payload.doc.id;
  //       return data;
  //     });
  //   }));
  // }
  onDeleteBanner(idBanner: BannerInterface): void {
    const idBn = idBanner.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Eliminaras el banner!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idBn );
        this._bannerConfg.deleteMenu(idBn);
        Swal.fire('Borrado', 'Banner Borrado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al eliminar el banner', 'error');
 });
    // const confirmacion = confirm('¿Esta seguro de eliminar este banner?');
    // if ( confirmacion ) {
    //   this._bannerConfg.deleteMenu(idBanner);
    // }
  }
  changeEstado (idBanner: BannerInterface, estado): void {
    const idBn = idBanner.uid;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Cambiaras el estado del banner!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idBn );
        this._bannerConfg.updateEstadoBanner(idBn, estado);
        Swal.fire('Estado', 'Banner cambiado de estado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al cabiar de esyatad el banner', 'error');
 });
    // const confirmacion = confirm('¿Esta seguro de cambiar el estado del Banner?');
    // if ( confirmacion ) {
    //   this._bannerConfg.updateEstadoBanner(uidBanner, estado);
    // }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
export class BannerInterface {
  public uidSucursal?: string;
  public uid?: string;
  public descripcion?: string;
  public clave?: string;
  public fecha?: string;
  public estado?: boolean;
  public modulo?: string;
  public nombreArchivo: string;
  public photourl: string;
  public estaSubiendo: boolean;
  public progreso: number;
  public archivo: File;
  public url: string;

  constructor (archivo: File) {
      this.archivo = archivo;
      this.nombreArchivo = archivo.name;

      this.estaSubiendo = false;
      this.progreso = 0;
  }}
