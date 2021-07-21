import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { UserInterface } from '../../models/user';
import { map } from 'rxjs/operators';
import { Cortes } from '../../models/cortes';

@Injectable({
  providedIn: 'root'
})
export class CortesService {
  public uidConvenio: string = null;

  constructor( public afs: AngularFirestore) {
    this.repartidoresCollection = afs.collection<UserInterface>('users', ref => ref.where('tipo', '==', 2));
    this.repartidores = this.repartidoresCollection.valueChanges();
    // Convenio
    this.convenioCollection = afs.collection<UserInterface>('users', ref => ref.where('tipo', '==', 3));
    this.convenios = this.convenioCollection.valueChanges();
    // Cortes
    this.cortesCollection = afs.collection<Cortes>('cortes');
    this.cortes = this.cortesCollection.valueChanges();

  }

  public repartidoresCollection: AngularFirestoreCollection<UserInterface>;
  public repartidores: Observable<UserInterface[]>;

  // convenio
   public convenioCollection: AngularFirestoreCollection<UserInterface>;
   public convenios: Observable<UserInterface[]>;
  // Para corte de convenio
   public convenioCorteCollection: AngularFirestoreCollection<any>;
   public conveniosCortes: Observable<any[]>;
   // información para colleccion del convenio
   public convenioUserCollection: AngularFirestoreCollection<any>;
   public conveniosUser: Observable<any[]>;

  // cortes
  public cortesCollection: AngularFirestoreCollection<Cortes>;
  public cortes: Observable<Cortes[]>;

  getAllRepartidores() {
   return this.repartidores = this.repartidoresCollection.snapshotChanges()
   .pipe(map( changes => {
     return changes.map(action => {
       const data = action.payload.doc.data() as UserInterface;
       data.uid = action.payload.doc.id;
       return data;
     });
   }));
  }

  getAllConvenios() {
    return this.convenios = this.convenioCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as UserInterface;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
   }
   getAllCortes() {
    return this.cortes = this.cortesCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Cortes;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
   }
// Corte convenio
getCorteUidConvenio(uid) {
this.uidConvenio = uid;
console.log('uidConevenio', this.uidConvenio);
}
getAllCortesConvenio(date1, date2) {
  this.getListConvenio();
  console.log('date1', date1);
  console.log('date2', date2);
  console.log('uidCorte', this.uidConvenio);
  this.convenioCorteCollection = this.afs.collection<any>('servicios', ref => ref.orderBy('fecha', 'asc')
  .startAt(date1).endAt(date2).where('estatus', '==', 'Terminado')
  .where('uidRestaurante', '==', this.uidConvenio));
    this.conveniosCortes = this.convenioCorteCollection.valueChanges();
    return this.conveniosCortes = this.convenioCorteCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as any;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }
  getListConvenio() {
    console.log('uidList', this.uidConvenio);
    this.convenioUserCollection = this.afs.collection<any>('users', ref => ref.where('uid', '==', this.uidConvenio));
    this.conveniosUser = this.convenioUserCollection.valueChanges();
    return this.conveniosCortes = this.convenioUserCollection.snapshotChanges().pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as any;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }

}
