import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TransporteInterface } from '../../models/transporte';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { SucursalInterface } from '../../models/sucursal';


@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  constructor( public afs: AngularFirestore) {
    this.transportesCollection = afs.collection<TransporteInterface>('transportes');
    this.transportes = this.transportesCollection.valueChanges();
   }

   public transportesCollection: AngularFirestoreCollection<TransporteInterface>;
   public transportes: Observable<TransporteInterface[]>;

   public selectedTransporte: SucursalInterface = {   id: null   };

   public transporteDoc: AngularFirestoreDocument<TransporteInterface>;
   public transporte: Observable<TransporteInterface>;

  addTransporte(transporte: TransporteInterface ) {
    this.transportesCollection.add(transporte);
  }

  getAllTransportes() {
    return this.transportes = this.transportesCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as TransporteInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  deleteTransporte( idTransporte: string): void {
    this.transporteDoc = this.afs.doc<TransporteInterface>(`transportes/${idTransporte}`);
    this.transporteDoc.delete();
  }
  updateTransporte(transporte: TransporteInterface): void {
    const idTransporte = transporte.id;
    this.transporteDoc = this.afs.doc<TransporteInterface>(`transportes/${idTransporte}`);
    this.transporteDoc.update(transporte);
  }
}
