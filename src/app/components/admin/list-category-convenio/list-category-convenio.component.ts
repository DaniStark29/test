import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoriaConvenioService, Categorias } from '../../../service/categoria/categoria-convenio.service';
import { UserInterface } from '../../../models/user';
import { AuthService } from '../../../service/auth.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category-convenio',
  templateUrl: './list-category-convenio.component.html',
  styleUrls: ['./list-category-convenio.component.css']
})
export class ListCategoryConvenioComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['posicion', 'nombre', 'descripcion', 'imagen', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public usuario: any = {};
  public userUid: string = null;
  public filterPost = '';
  public categorias: Categorias[];
  pageActual: number = 1;
  uidUser: string = null;
  data: any;
  imageUrl: any;
  
  constructor(public _service_cat: CategoriaConvenioService,
              private authService: AuthService,
              private afs: AngularFirestore
    ) { }
    public CategoriasCollection: AngularFirestoreCollection<any>;
    public Categorias: Observable<any[]>;

    Uidsucursal: string = '';
    user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    direccion: '',
    uidSucursal: '',
    roles: {}
  };

  ngOnInit() {
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.afs.doc(`users/${this.uidUser}`).valueChanges().subscribe(data => {
          this.usuario = data;
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          // this.getListRepartidores(this.Uidsucursal);
          this._service_cat.getCategorias(this.Uidsucursal)
          .subscribe( res =>  (this.dataSource.data = res));

          // console.log('usuer', this.Uidsucursal);
        });
      }
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  // getAllCat(uid) {
  //   this.getListCategorias(uid).subscribe( cate =>  {
  //     this.categorias = cate;
  //     console.log('categorias', cate);
  //   });
  // }
  // getListCategorias(uid) {
  //   console.log('uidsu', uid);
  //    this.CategoriasCollection = this.afs.collection<Categorias>('categoria_critico', ref =>
  //     ref.where('uidSucursal', '==', uid).orderBy('posicion', 'asc'));
  //      this.Categorias = this.CategoriasCollection.valueChanges();
  //      return this.Categorias = this.CategoriasCollection.snapshotChanges()
  //     .pipe(map( changes => {
  //      return changes.map( action => {
  //     const data = action.payload.doc.data() as Categorias;
  //     data.id = action.payload.doc.id;
  //     return data;
  //   });
  // }));
    // this.afs.collection('categoria_critico', ref =>
    //  ref.where('uidSucursal', '==', uid).orderBy('posicion', 'asc')).valueChanges().subscribe( categoria => {
    //   this.categorias = categoria;
    //   console.log('categoria', categoria);
    // });
  // }

  onPreUpdateCategoria(categoria) {
    console.log('CATE', categoria);
  this._service_cat.selectedCategoria = Object.assign({}, categoria);
  }
  borrar(id: Categorias) {
    const idCa = id.id;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Eliminaras la categoria!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then( result => {
      if ( result.value ) {
        // console.log('Datos', idRepa );
        this._service_cat.eliminar(idCa);
        Swal.fire('Borrado', 'Categoria Borrado', 'success');
      }
    }).catch((error) => {
      Swal.fire('Error!', 'Hubo un error al eliminar la categoria', 'error');
 });
    // const confirmacion = confirm('¿Estas seguro de eliminar esta categoría?');
    // if ( confirmacion ) {
    //   this._service_cat.eliminar(id);
    // }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
