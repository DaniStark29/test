import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import * as firebase from 'firebase';
import { AlertService } from 'ngx-alerts';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data: any = {};

  constructor( public afsAuth: AngularFireAuth,
               public afs: AngularFirestore,
              private alertService: AlertService,
              private http: Http,

     ) { }

  newRegister(username: string, lastname: string, address: string, phone: string, marca: string, placa: string,
    email: string, pass: string, uidSucursal: string, img: string) {
    // Configuramos una nueva variable de conexión
    const config = {apiKey: "AIzaSyCBWTmCjb-1_zDsl-yjBwl3EqCnVA_SEto",
    authDomain: "toctoc-54179.firebaseapp.com",
    databaseURL: "https://toctoc-54179.firebaseio.com",};
    const secondaryApp = firebase.initializeApp(config, 'Secondary');
    // Registramos al repartidor usando la nueva variable de conexión
    return new Promise((resolve, reject) => {
      secondaryApp.auth().createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user, username, lastname, address, phone, marca, placa, uidSucursal, img);
            this.alertService.success('Se agrego correctamente el repartidor');
                  }).catch(err => this.alertService.danger(err));
                    });
  }

  // registerUser(username: string, lastname: string, address: string, phone: string,
  //   email: string, pass: string, uidSucursal: string, img: string) {
  //   return new Promise((resolve, reject) => {
  //     this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
  //       .then(userData => {
  //         resolve(userData),
  //           this.updateUserData(userData.user, username, lastname, address, phone, uidSucursal, img)
  //                 }).catch(err => console.log(reject(err)))
  //                   });
  // }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject ) => {
      this.afsAuth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }
  logOut() {
    this.afsAuth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user, username, lastname, address, phone, marca, placa, uidSucursal, img) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      username: username,
      lastname: lastname,
      address: address,
      phone: phone,
      marca: marca,
      placa: placa,
      activo: true,
      email: user.email,
      uidSucursal: uidSucursal,
      roles: {
        repartidor: true
      },
      tipo: 2,
      uid: user.uid,
      geolocalizacion: {},
      photourl: img

    }
    return userRef.set(data, { merge: true })
  }
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

  habil (uid) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    //
    const options = new RequestOptions({ headers: headers });
    const url = 'https://sdk-admin-bme.firebaseapp.com/habilitar';
    const data1 = JSON.stringify({
      uid: uid
    });
    this.http.post(url, data1, options).subscribe(res => {
      console.log('Se habilito del SDK');
    });
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const data: UserInterface = {
      activo: true,
      pago: 'Habil',
      roles: {
        restaurante: true
      },
    };
    this.alertService.info('El convenio se habilito correctamente');
    return userRef.set(data, { merge: true });
  }
  vencido (uid) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    //
    const options = new RequestOptions({ headers: headers });
    const url = 'https://sdk-admin-bme.firebaseapp.com/inhabilitar';
    const data1 = JSON.stringify({
      uid: uid
    });
    this.http.post(url, data1, options).subscribe(res => {
      console.log('Se deshabilito del SDK');
    });
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const data: UserInterface = {
      activo: false,
      pago: 'Vencido',
      roles: {
        restaurante: true,

      },
    };
    this.alertService.info('El convenio se inhabilito correctamente');
    return userRef.set(data, { merge: true });
  }
}
