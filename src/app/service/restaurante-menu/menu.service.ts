import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { MenuInterface } from '../../models/restaurante/menu';
import * as firebase from 'firebase';
import { AlertService } from 'ngx-alerts';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  constructor(public afs: AngularFirestore,  private alertService: AlertService) {
    this.menusCollection = afs.collection<MenuInterface>('menus');
    this.menus = this.menusCollection.valueChanges();
   }
  public menusCollection: AngularFirestoreCollection<MenuInterface>;
  public menus: Observable<MenuInterface[]>;
  public selectedMenu: MenuInterface = { };
  public menuDoc: AngularFirestoreDocument<MenuInterface>;
  public menu: Observable<MenuInterface>;
  data: any = {};
  uid: any;
  // Get
   getAllMenus() {
     return this.menus = this.menusCollection.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as MenuInterface;
         return data;
       });
     }));
   }
  public guardarMenu(img, nombre, estado, precio, descripcion, userUid ) {
    
    if ( img === '' || nombre === '' || estado === '' || precio === '' || descripcion === '' || !img) {
        this.alertService.warning('No se guardo, algunos campos no fueron completados');
    } else {
    this.afs.collection('menus').add({
      nombre: nombre,
      estado: estado,
      precio: precio,
      descripcion: descripcion,
      userUid: userUid,
      photourl: img,
      time: Date.now(),
      fecha: Date.now().toString()
    });
    this.alertService.success('Se agrego el producto.');
  }
  }

  editarMenu(img, menu: MenuInterface) {
    const idMenu = menu.id;
    console.log('uid menu', idMenu);
    // Cuando no existe una imagen
    if (!img ) {
      this.afs.collection('menus').doc(idMenu).update({
        nombre: menu.nombre,
        estado: menu.estado,
        precio: menu.precio,
        descripcion: menu.descripcion
      });
      this.alertService.info('Se edito el producto correctamente');
      // Cuando existe una imagen
    } else {
      this.afs.collection('menus').doc(idMenu).update({
        nombre: menu.nombre,
        estado: menu.estado,
        precio: menu.precio,
        descripcion: menu.descripcion,
        photourl: img
      });
      this.alertService.info('Se edito el producto correctamente');
    }
  }
  // Delete
  deleteMenu( idMenu: string) {
    this.menuDoc = this.afs.doc<MenuInterface>(`menus/${idMenu}`);
    this.menuDoc.delete();
    // this.alertService.info('Producto eliminado.');
  }
  updateMenuDesactivar(uidMenu): void {
    this.data = {
      estado: '2'
    };
    this.menuDoc = this.afs.doc<MenuInterface>(`menus/${uidMenu}`);
    this.menuDoc.update(this.data);
    console.log('update', this.data);
    // this.alertService.info('Producto desactivado');

  }
  updateMenuActivar(uidMenu): void {
    this.data = {
      estado: '1'
    };
    this.menuDoc = this.afs.doc<MenuInterface>(`menus/${uidMenu}`);
    this.menuDoc.update(this.data);
    console.log('update', this.data);
    // this.alertService.info('Producto activado.');
  }

  getMenu(idUser) {
    return this.afs.collection('menus', ref =>
      ref.where('userUid', '==', idUser)
    ).valueChanges();
  }
}

