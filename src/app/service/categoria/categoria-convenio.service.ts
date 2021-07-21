import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class CategoriaConvenioService {

  constructor(public afs: AngularFirestore,
              private alertService: AlertService) {
  this.categoriasCollection = afs.collection<any>('categoria_critico');
  this.categorias = this.categoriasCollection.valueChanges();
               }

  public categoriasCollection: AngularFirestoreCollection<any>;
  public categorias: Observable<any[]>;
  public selectedCategoria: Categorias = { id: null };
  public categoriaDoc: AngularFirestoreDocument<any>;
  public categoria: Observable<any>;
  data: any = {};
  uid: any;

  public guardarCategoria(img, nombre, posicion, descripcion, uidSucursal ) {
    if ( img === '' || nombre === '' || posicion === '' || descripcion === '' || !img) {
        this.alertService.warning('No se guardo, algunos campos no fueron completados');
    } else {
    this.afs.collection('categoria_critico').add({
      nombre: nombre,
      posicion: posicion,
      descripcion: descripcion,
      uidSucursal: uidSucursal,
      imagen: img
    }).then( ref => {
      console.log('id', ref.id);
      this.afs.collection('categoria_critico').doc(ref.id).update({
        id: ref.id
      });
    });
    this.alertService.success('Se agrego la categoria');
  }
  }
  editarCategoria(img, categoria: Categorias) {
    const id = categoria.id;
    console.log('uid menu', categoria.id);
    // Cuando no existe una imagen
    if (!img ) {
      this.afs.collection('categoria_critico').doc(id).update({
      nombre: categoria.nombre,
      posicion: categoria.posicion,
      descripcion: categoria.descripcion
      });
      this.alertService.info('Se edito el categoría correctamente');
      // Cuando existe una imagen
    } else {
      this.afs.collection('categoria_critico').doc(id).update({
        nombre: categoria.nombre,
        posicion: categoria.posicion,
        descripcion: categoria.descripcion,
        imagen: img
      });
      this.alertService.info('Se edito la categoría correctamente');
    }
  }
  eliminar(id) {
    this.afs.collection('categoria_critico').doc(id).delete();
    this.alertService.info('Se elimino la categoría correctamente');
  }

  getCategorias(uidSucursal) {
    return this.afs.collection('categoria_critico', ref =>
     ref.where('uidSucursal', '==', uidSucursal).orderBy('posicion', 'asc')
    ).valueChanges();
  }
}
export class Categorias {
  public id?: string;
  public nombre?: string;
  public posicion?: number;
  public descripcion?: string;
  public imagen?: string;
}
