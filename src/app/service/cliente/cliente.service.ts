import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserInterface } from 'src/app/models/cliente';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private afs: AngularFirestore, private alertService: AlertService, private http: Http,
    ) {
    this.clientesCollection = this.afs.collection<UserInterface>('users', ref => ref.where('tipo', '==', 4));
    // this.clientesPerfil = this.afs.collection<UserInterface>(`users/${perfil}`);
    this.clientes = this.clientesCollection.valueChanges();

   }

public clientesCollection: AngularFirestoreCollection<UserInterface>;
// public clientesPerfil: AngularFirestoreCollection<UserInterface>;

public clientes: Observable<UserInterface[]>;
public clienteDoc: AngularFirestoreDocument<UserInterface>;

getAllClientes() {
  return this.clientes = this.clientesCollection.snapshotChanges()
  .pipe(map( changes => {
    return changes.map( action => {
      const data = action.payload.doc.data() as UserInterface;
      data.uid = action.payload.doc.id;
      return data;
    });
  }));
}
deleteClientes(uid: string): void {
  // tslint:disable-next-line: deprecation
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  //
  // tslint:disable-next-line: deprecation
  const options = new RequestOptions({ headers: headers });
  const url = 'https://bringme-a412b.firebaseapp.com/eliminar';
  const data = JSON.stringify({
    uid: uid
  });
  this.http.post(url, data, options).subscribe(res => {
    console.log('El usuario se elimino de SDK');
  });
  this.clienteDoc = this.afs.doc<UserInterface>(`users/${uid}`);
  this.clienteDoc.delete();
  this.alertService.info('El usuario se elimino correctamente');

}
desactivarCliente(uid): void {
  // tslint:disable-next-line: deprecation
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  //
  // tslint:disable-next-line: deprecation
  const options = new RequestOptions({ headers: headers });
  const url = 'https://sdk-admin-bme.firebaseapp.com/inhabilitar';
  const data = JSON.stringify({
    uid: uid
  });
  this.http.post(url, data, options).subscribe(res => {
    console.log('Se deshabilito del SDK');
  });
  // const idRepartidor = repartidor.uid;
  this.afs.collection('users').doc(uid).update({
    activo: false
  });
  this.alertService.info('El usuario se inhabilito correctamente');

}
activarConvenio(uid): void {
  // tslint:disable-next-line: deprecation
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  //
  // tslint:disable-next-line: deprecation
  const options = new RequestOptions({ headers: headers });
  const url = 'https://sdk-admin-bme.firebaseapp.com/habilitar';
  const data = JSON.stringify({
    uid: uid
  });
  this.http.post(url, data, options).subscribe(res => {
    console.log('Se habilito del SDK');
  });
  // const idRepartidor = repartidor.uid;
  this.afs.collection('users').doc(uid).update({
    activo: true
  });
  this.alertService.info('El usuario se habilito correctamente');

}

getClientes(uidSucursal) {
  return this.afs.collection('users', ref =>
    ref.where('tipo', '==', 4).where('uidSucursal', '==', uidSucursal)
  ).valueChanges();
}

updateCltIDSucursal(uidClt: any){
  this.afs.collection('users').doc(uidClt).update({
    uidSucursal: ''
  });
}

}
