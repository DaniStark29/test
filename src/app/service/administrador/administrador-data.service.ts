import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserInterface } from '../../models/user';
import { Observable } from 'rxjs/internal/Observable';
import * as firebase from 'firebase';
import { AlertService } from 'ngx-alerts';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdministradorDataService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore,
    private http: Http,
    private alertService: AlertService,
  ) {
    this.administradoresCollection = this.afs.collection<UserInterface>('users', ref => ref.where('tipo', '==', 1));
    this.administradores = this.administradoresCollection.valueChanges();
  }
  uid: string;
  public administradoresCollection: AngularFirestoreCollection<UserInterface>;
  public administradores: Observable<UserInterface[]>;
  // public selectedUser: UserInterface = { roles: {} };

  public administradorDoc: AngularFirestoreDocument<UserInterface>;

  public registerUser(username: string, lastname: string, address: string, phone: string,
    email: string, pass: string, uidsucursal: string) {
    // Configuramos una nueva variable de conexión
    const config = {
      apiKey: "AIzaSyCBWTmCjb-1_zDsl-yjBwl3EqCnVA_SEto",
    authDomain: "toctoc-54179.firebaseapp.com",
    databaseURL: "https://toctoc-54179.firebaseio.com",
    };
    const secondaryApp = firebase.initializeApp(config, 'Secondary');
    // Registramos al ADMIN usando la nueva variable de conexión
    return new Promise((resolve, reject) => {
      console.log('pass', email, pass);
      secondaryApp.auth().createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user, username, lastname, address, phone, uidsucursal);
          this.alertService.success('Se agrego correctamente el convenio');
        }).catch(err => this.alertService.danger(err));
    });

  }

  public updateUserData(user, username, lastname, address, phone, uidSucursal) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      username: username,
      lastname: lastname,
      address: address,
      phone: phone,
      activo: true,
      email: user.email,
      geolocalizacion: {},
      // photoUrl: user.photoURL,
      roles: {
        administrador: true
      },
      tipo: 1,
      uid: user.uid,
      uidSucursal: uidSucursal
    }
    console.log('DATAadmin', data);

    return userRef.set(data, { merge: true })
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  getAllAdministradores() {
    return this.administradores = this.administradoresCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserInterface;
          data.uid = action.payload.doc.id;
          return data;
        });
      }));
  }
  deleteAdmin(uid: string): void {
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
    this.administradorDoc = this.afs.doc<UserInterface>(`users/${uid}`);
    this.administradorDoc.delete();
    // this.alertService.info('El usuario se elimino correctamente');
  }
  isUserAdministrador(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
  desactivarAdmin(uid): void {
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
    this.afs.collection('users').doc(uid).update({
      activo: false
    });
    // this.alertService.info('El usuario se inhabilito correctamente');

  }
  activarAdmin(uid): void {
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
    this.afs.collection('users').doc(uid).update({
      activo: true
    });
    // this.alertService.info('El usuario se habilito correctamente');

  }
  
  getAdmins(uidSucursal) {
    return this.afs.collection('users', ref =>
      ref.where('tipo', '==', 1).where('uidSucursal', '==', uidSucursal)
    ).valueChanges();
  }

}
