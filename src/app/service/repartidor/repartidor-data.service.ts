import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { UserInterface } from '../../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class RepartidorDataService {
  // public credentials: UserInterface;
  activo = 'false';

  constructor(
    public afs: AngularFirestore,
    private http: Http,
    private alertService: AlertService
  ) {
    this.repartidoresCollection = this.afs.collection<UserInterface>(
      'users',
      ref => ref.where('tipo', '==', 2)
    );
    this.repartidores = this.repartidoresCollection.valueChanges();
  }
  // Para ver la colección
  public repartidoresCollection: AngularFirestoreCollection<UserInterface>;
  public repartidores: Observable<UserInterface[]>;
  // Detalle
  public repartidorDoc: AngularFirestoreDocument<UserInterface>;

  getAllRepartidores(uidSucursal) {
    return (this.repartidores = this.repartidoresCollection
      .snapshotChanges()
      .pipe(
        map(changes => {
          // Recuperando el id
          return changes.map(action => {
            const data = action.payload.doc.data() as UserInterface;
            data.uid = action.payload.doc.id;
            return data;
          });
        })
      ));
  }
  
  public updateRepartidor(
    user,
    username,
    lastname,
    address,
    phone,
    marca,
    placa,
    uidSucursal,
    img
  ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user}`
    );
    const data: UserInterface = {
      username: username,
      lastname: lastname,
      address: address,
      phone: phone,
      marca: marca,
      placa: placa,
      activo: true,
      uidSucursal: uidSucursal,
      roles: {
        repartidor: true
      },
      tipo: 2,
      uid: user,
      geolocalizacion: {},
      photourl: img
    };
    return userRef
      .update(data)
      .then(() =>
        this.alertService.success('Repartidor actualizado correctamente.')
      );
  }

  deleteRepartidor(uid: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    //
    const options = new RequestOptions({ headers: headers });
    const url = 'https://sdk-admin-bme.firebaseapp.com/delete';
    const data = JSON.stringify({
      uid: uid
    });
    this.http.post(url, data, options).subscribe(res => {
      console.log('El usuario se elimino de SDK');
    });
    // Eliminamos el usuario de la base de datos
    this.repartidorDoc = this.afs.doc<UserInterface>(`users/${uid}`);
    this.repartidorDoc.delete();
    // this.alertService.info('El usuario se elimino correctamente');
  }

  desactivarRepartidor(uid): void {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    //
    const options = new RequestOptions({ headers: headers });
    const url = 'https://sdk-admin-bme.firebaseapp.com/inhabilitar';
    const data = JSON.stringify({
      uid: uid
    });
    this.http.post(url, data, options).subscribe(res => {
      console.log('Se deshabilito del SDK');
    });
    // const idRepartidor = repartidor.uid;
    this.afs
      .collection('users')
      .doc(uid)
      .update({
        activo: false
      });
    this.alertService.info('El usuario se inhabilito correctamente');
  }

  activarRepartidor(uid): void {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    //
    const options = new RequestOptions({ headers: headers });
    const url = 'https://sdk-admin-bme.firebaseapp.com/habilitar';
    const data = JSON.stringify({
      uid: uid
    });
    this.http.post(url, data, options).subscribe(res => {
      console.log('Se habilito del SDK');
    });
    // const idRepartidor = repartidor.uid;
    this.afs
      .collection('users')
      .doc(uid)
      .update({
        activo: true
      });
    this.alertService.info('El usuario se habilito correctamente');
  }
  getRepartidores(uidSucursal) {
    return this.afs.collection('users', ref =>
      ref.where('tipo', '==', 2).where('uidSucursal', '==', uidSucursal)
    ).valueChanges();
  }
}
