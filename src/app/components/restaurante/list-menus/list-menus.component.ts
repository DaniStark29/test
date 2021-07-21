import { Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import { MenuService } from '../../../service/restaurante-menu/menu.service';
import { MenuInterface } from '../../../models/restaurante/menu';
import { RestauranteDataService } from 'src/app/service/restaurante/restaurante-data.service';
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
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.css']
})
export class ListMenusComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'precio', 'descripcion', 'photourl', 'estado', 'edit', 'delete', 'status'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isRestaurante: any = null;
  public userUid: string = null;
  public menus: MenuInterface[];
  @Input() userUidd: string;
  public filterPost = '';
  pageActual: number = 1;
  data: any;
  imageUrl: any;
  user: UserInterface = {
    uid: '',
    username: '',
    roles: {},
    geolocalizacion: {}
   }

  constructor(public dataMenu: MenuService,
              public dataser: RestauranteDataService,
              private auth: AuthService,
              private afs: AngularFirestore) {
      this.auth.isAuth().subscribe( user => {
        if (user) {
          this.user.uid = user.uid;
          this.user.username = user.displayName;
          this.MenusCollection = this.afs.collection<MenuInterface>('menus', ref => ref.where('userUid', '==', this.user.uid));
       this.Menus = this.MenusCollection.valueChanges();
        }
      });
     }
     public MenusCollection: AngularFirestoreCollection<MenuInterface>;
     public Menus: Observable<MenuInterface[]>;



  ngOnInit() {
    this.getCurrentUser();
    this.auth.isAuth().subscribe( user => {
      if (user) {
        this.user.uid = user.uid;
        this.user.username = user.displayName;
      }
      this.getAllMenus()
        .subscribe( res => (this.dataSource.data = res ));
    });
    // this.getListMenu();
  }
  // getListMenu() {
  //   this.getAllMenus().subscribe( menus =>  {
  //     this.menus = menus;
  //   });
  // }
  getCurrentUser() {
    this.dataser.isAuth().subscribe(auth => {
      if ( auth ) {
        this.userUid = auth.uid;
        this.dataser.isUserRestaurante( this.userUid).subscribe(userRole => {
          this.isRestaurante = Object.assign({}, userRole.roles).hasOwnProperty('restaurante');
         });
      }
    });
}

ngAfterViewInit() {

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

}

onDeleteMenu(menu: MenuInterface) {
  const idMn = menu.id;
  console.log('iid menu', menu);

  Swal.fire({
    title: '¿Estas seguro?',
    text: `Eliminaras este producto de la lista del menú!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
  }).then( result => {
    if ( result.value ) {
      // console.log('Datos', idRepa );
      this.dataMenu.deleteMenu(idMn);
      Swal.fire('Eliminado', 'Producto eliminado', 'success');
    }
  }).catch((error) => {
    Swal.fire('Error!', 'Hubo un error al eliminar el producto', 'error');
});
  // const confirmacion = confirm('¿Estas seguro de eliminar este producto?');
  // if ( confirmacion ) {
  //   this.dataMenu.deleteMenu(idMenu);
  // }
}
onPreUpdateMenu(menu: MenuInterface) {
  console.log('MENU', menu);
this.dataMenu.selectedMenu = Object.assign({}, menu);
}
getAllMenus() {
  return this.Menus = this.MenusCollection.snapshotChanges()
  .pipe(map( changes => {
    return changes.map( action => {
      const data = action.payload.doc.data() as MenuInterface;
      data.id = action.payload.doc.id;
      return data;
    });
  }));
}
desactivarProducto (menu: MenuInterface) {
  const idMn = menu.id;
  console.log('iid menu', idMn);
  Swal.fire({
    title: '¿Estas seguro?',
    text: `Desactivaras este producto de la lista del menú!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, desactivar'
  }).then( result => {
    if ( result.value ) {
      // console.log('Datos', idRepa );
      this.dataMenu.updateMenuDesactivar(idMn);
      Swal.fire('Desactivado', 'Producto desactivado', 'success');
    }
  }).catch((error) => {
    Swal.fire('Error!', 'Hubo un error al desactivar el producto', 'error');
});
  // const confirmacion = confirm('¿Estas seguro de desactivar este producto?');
  // if ( confirmacion ) {
  //   this.dataMenu.updateMenuDesactivar(uidMenu);
  // }
}

activarProducto(menu: MenuInterface) {
  const idMn = menu.id;
  console.log('iid menu', idMn);

  Swal.fire({
    title: '¿Estas seguro?',
    text: `Activaras este producto de la lista al menú!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, activar'
  }).then( result => {
    if ( result.value ) {
      // console.log('Datos', idRepa );
      this.dataMenu.updateMenuActivar(idMn);
      Swal.fire('Activado', 'Producto activado', 'success');
    }
  }).catch((error) => {
    Swal.fire('Error!', 'Hubo un error al activar el producto', 'error');
});
  // const confirmacion = confirm('¿Estas seguro de activar este producto?');
  // if ( confirmacion ) {
  //   this.dataMenu.updateMenuActivar(uidMenu);
  // }
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
