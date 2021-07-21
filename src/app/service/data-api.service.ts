import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SucursalInterface } from '../models/sucursal';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(public afs: AngularFirestore ) {
    this.sucursalesCollection = afs.collection<SucursalInterface>('sucursales');
    this.sucursales = this.sucursalesCollection.valueChanges();
  }
  // para ver toda la collección
  public sucursalesCollection: AngularFirestoreCollection<SucursalInterface>;
  public sucursales: Observable<SucursalInterface[]>;
  // Para el detalle
  public sucursalDoc: AngularFirestoreDocument<SucursalInterface>;
  public sucursal: Observable<SucursalInterface>;
  //
 public selectedSucursal: SucursalInterface = {
   id: null
 };
  getAllSucursales() {
    return this.sucursales = this.sucursalesCollection.snapshotChanges()
    .pipe(map( changes => {
      // recuperando id de la collección
      return changes.map( action => {
        const data = action.payload.doc.data() as SucursalInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  getOneSucursal(idSucursal: string ) {
    this.sucursalDoc = this.afs.doc<SucursalInterface>(`sucursales/${idSucursal}`);
    return this.sucursal = this.sucursalDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as SucursalInterface;
        data.id = action.payload.id;
        return data;
      }
    }));

  }
  addSucursal( sucursal: SucursalInterface ): void {
    this.sucursalesCollection.add(sucursal);
  }
  updateSucursal( sucursal: SucursalInterface ): void {
    const idSucursal = sucursal.id;
    this.sucursalDoc = this.afs.doc<SucursalInterface>(`sucursales/${idSucursal}`);
    this.sucursalDoc.update(sucursal);
  }
  deleteSucursal(idSucursal: string): void {
    this.sucursalDoc = this.afs.doc<SucursalInterface>(`sucursales/${idSucursal}`);
    this.sucursalDoc.delete();
  }
}
