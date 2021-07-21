import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Servicios, Pedidos } from '../../models/pedidos';
import { UserInterface } from 'src/app/models/user';
import { MenuInterface } from 'src/app/models/restaurante/menu';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  constructor(public afs: AngularFirestore) {
    this.pedidosCollection = afs.collection<Servicios>('servicios', ref =>
      ref.where('estatus', '<', 'Terminado').where('estatus', '<', 'Terminado')
    );
    this.pedidos = this.pedidosCollection.valueChanges();
    // Historial pagados
    this.historialsCollectionPagados = afs.collection<Servicios>(
      'servicios',
      ref => ref.where('estatus', '==', 'Terminado')
    );
    this.historialsPagados = this.pedidosCollection.valueChanges();
    // Historial cancelados
    this.historialsCollectionCancelados = afs.collection<Servicios>(
      'servicios',
      ref => ref.where('estatus', '==', 'Cancelado')
    );
    this.historialsCancelados = this.pedidosCollection.valueChanges();
    // Clientes
    this.usuariosCollection = afs.collection<UserInterface>('users');

    // Pedidos
    this.serviciosCollection = afs.collection<Pedidos>('pedidos');
    // Menu
    this.menusCollection = afs.collection<MenuInterface>('menus');
  }
  // Productos menu
  public menusCollection: AngularFirestoreCollection<MenuInterface>;
  public menus: Observable<MenuInterface[]>;
  // Pedidos
  public serviciosCollection: AngularFirestoreCollection<Pedidos>;

  // Servicios
  public pedidosCollection: AngularFirestoreCollection<Servicios>;
  public pedidos: Observable<Servicios[]>;

  // Historial de servicios pagados
  public historialsCollectionPagados: AngularFirestoreCollection<Servicios>;
  public historialsPagados: Observable<Servicios[]>;

  // Historial de servicios cancelados
  public historialsCollectionCancelados: AngularFirestoreCollection<Servicios>;
  public historialsCancelados: Observable<Servicios[]>;

  // Usuarios
  public usuariosCollection: AngularFirestoreCollection<UserInterface>;
  public usuarios: Observable<UserInterface[]>;

  // Servicios
  public pedidoDoc: AngularFirestoreDocument<Servicios>;
  
  // Points
  public serviciosP: AngularFirestoreCollection<any[]>;
  public _serviciosP: Observable<any>;
  public pedidoDoc2: AngularFirestoreCollection<any[]>;
  public pedido2: Observable<any>;

  public productoCollection : AngularFirestoreCollection<any[]>;
  public prodcuto: Observable<any>;

  // Clientes
  public clienteCollection : AngularFirestoreCollection<any[]>;
  public cliente: Observable<any>;

  // Repartidores
  public repartidorCollection : AngularFirestoreCollection<any[]>;
  public repartidor: Observable<any>;

  // Repartidores
  public convenioCollection : AngularFirestoreCollection<any[]>;
  public convenio: Observable<any>;


  public pedido: Observable<Servicios>;
  // Historial de servicios pagados
  getAllHistorial() {
    return (this.historialsPagados = this.historialsCollectionPagados
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as Servicios;
            data.uid = action.payload.doc.id;
            return data;
          });
        })
      ));
  }
  // Historial de servicios cancelados
  getAllHistorialCancel() {
    return (this.historialsCancelados = this.historialsCollectionCancelados
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as Servicios;
            data.uid = action.payload.doc.id;
            return data;
          });
        })
      ));
  }
  getAllPedidos() {
    return (this.pedidos = this.pedidosCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Servicios;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getAllUsuarios() {
    return (this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserInterface;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getAllMenu() {
    return (this.menus = this.menusCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as MenuInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getOneServicio(idServicio: string) {
    this.pedidoDoc = this.afs.doc<Servicios>(`servicios/${idServicio}`);
    // this.pedidoDoc = this.afs.collection<Servicios>('servicios').doc(`/${idPedido}`).collection<Pedidos>('pedidos');
    return (this.pedido = this.pedidoDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Servicios;
          data.uid = action.payload.id;
          return data;
        }
      })
    ));
  }

  getAllServiciosP(idx) {
    this.serviciosP = this.afs.collection<any>('rutas', ref =>
      ref.where('idServicio', '==', idx).where('estatus', '==', 1).orderBy('fecha', 'asc')
    );
    this._serviciosP = this.serviciosP.valueChanges();
    return (this._serviciosP = this.serviciosP.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  // Update de consultas
  getPedidos(Id) {
    this.pedidoDoc2 = this.afs.collection<any>('pedidos', ref =>
      ref.where('servicioID', '==', Id)
    );
    this.pedido2 = this.pedidoDoc2.valueChanges();
    return (this.pedido2 = this.pedidoDoc2.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getProducto(Id) {
    this.productoCollection = this.afs.collection<any>('productos', ref =>
      ref.where('servicioID', '==', Id)
    );
    this.prodcuto = this.productoCollection.valueChanges();
    return (this.prodcuto = this.productoCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getCliente(Id) {
    this.clienteCollection = this.afs.collection<any>('users', ref =>
      ref.where('uid', '==', Id)
    );
    this.cliente = this.clienteCollection.valueChanges();
    return (this.cliente = this.clienteCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getRepartidor(Id) {
    this.repartidorCollection = this.afs.collection<any>('users', ref =>
      ref.where('uid', '==', Id)
    );
    this.repartidor = this.repartidorCollection.valueChanges();
    return (this.repartidor = this.repartidorCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getConvenio(Id) {
    this.convenioCollection = this.afs.collection<any>('users', ref =>
      ref.where('uid', '==', Id)
    );
    this.convenio = this.convenioCollection.valueChanges();
    return (this.convenio = this.convenioCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
}
