import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import * as firebase from 'firebase';
import { FileRes } from '../../models/file-res';
import { UserInterface } from '../../models/user';
import { AlertService } from 'ngx-alerts';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RestauranteDataService {
  private CARPETA_IMAGENES = 'users';
  data: any;
  constructor(
    public afsAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private alertService: AlertService,
    private http: Http
  ) {
    this.restaurantesCollection = this.afs.collection<UserInterface>(
      'users',
      ref => ref.where('tipo', '==', 3)
    );
    this.restaurantes = this.restaurantesCollection.valueChanges();
  }
  public restaurantesCollection: AngularFirestoreCollection<UserInterface>;
  public restaurantes: Observable<UserInterface[]>;
  uid: string;
  public restauranteDoc: AngularFirestoreDocument<UserInterface>;

  // cargarImagenesFirebase( imagenes: FileRes[], email: string, password: string, username: string,
  //   contacto: string, address: string, phone: string, direccion, uidSucursal: string ) {
  //   // console.log( imagenes );
  //   email = email;
  //   password = password;
  //   username = username;
  //   contacto = contacto;
  //   address = address;
  //   phone = phone;
  //   direccion = direccion;
  //   uidSucursal = uidSucursal;
  //   const storageRef = firebase.storage().ref();

  //   for ( const item of imagenes ) {
  //     item.estaSubiendo = true;
  //     if (item.progreso >= 100 ) {
  //       continue;
  //     }
  //     const uploadTask: firebase.storage.UploadTask =
  //       storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo}`)
  //         .put( item.archivo);

  //         uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //           (snapshot: firebase.storage.UploadTaskSnapshot) =>
  //            item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
  //           (error) => this.alertService.warning('Error al subir imagen.'),
  //           () => {
  //            this.alertService.success('Convenio guardado.');
  //            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //            item.photourl = downloadURL;
  //            item.estaSubiendo = false;
  //           this.guardarImagen({
  //            nombre: item.nombreArchivo,
  //            photourl: item.photourl,
  //            email: email,
  //            password: password,
  //            username: username,
  //            contacto: contacto,
  //            address: address,
  //            phone: phone,
  //            roles: { restaurante: true },
  //            tipo: 3,
  //            activo: true,
  //            direccion: direccion,
  //            pago: 'Habil',
  //            uidSucursal: uidSucursal
  //            // uid: this.uid
  //           });
  //           });
  //           });
  //   }
  // }
  //  guardarImagen(  data: { nombre: string, photourl: string, email: string, password: string,
  //    username: string, contacto: string, address: string, phone: string, roles: { }, tipo: number,
  //    activo: boolean, direccion: {}, pago: string, uidSucursal: string}) {
  //      return new Promise(( resolve, reject ) => {
  //        this.afsAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
  //        .then(userData => {
  //          resolve(userData),
  //          this.uid = userData.user.uid;
  //          console.log('uidsasas', this.uid);
  //           this.afs.collection(`/${ this.CARPETA_IMAGENES }`).doc(this.uid).set({
  //            nombre: data.nombre,
  //            username: data.username,
  //            photourl: data.photourl,
  //            email: data.email,
  //            contacto: data.contacto,
  //            address: data.address,
  //            phone: data.phone,
  //            roles: data.roles,
  //            tipo: data.tipo,
  //            activo: data.activo,
  //            uid: this.uid,
  //            direccion: data.direccion,
  //            pago: data.pago,
  //            uidSucursal: data.uidSucursal
  //           });
  //         // console.log('data', this.data);
  //       });
  //        });
  // }
  newRegister(
    abrir,
    cerrar,
    email,
    password,
    username,
    contacto,
    address,
    phone,
    categoria,
    direccion,
    uidSucursal,
    img
  ) {
    // Configuramos una nueva variable de conexión
    const config = {
      apiKey: "AIzaSyCBWTmCjb-1_zDsl-yjBwl3EqCnVA_SEto",
      authDomain: "toctoc-54179.firebaseapp.com",
      databaseURL: "https://toctoc-54179.firebaseio.com",
    };
    const secondaryApp = firebase.initializeApp(config, 'Secondary');
    // Registramos al repartidor usando la nueva variable de conexión
    return new Promise((resolve, reject) => {
      secondaryApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(
              abrir,
              cerrar,
              userData.user,
              username,
              contacto,
              address,
              phone,
              categoria,
              direccion,
              uidSucursal,
              img
            );
          this.alertService.success('Se agrego correctamente el convenio');
        })
        .catch(err => this.alertService.danger(err));
    });
  }
  private updateUserData(
    abrir,
    cerrar,
    user,
    username,
    contacto,
    address,
    phone,
    categoria,
    direccion,
    uidSucursal,
    img
  ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: UserInterface = {
      username: username,
      contacto: contacto,
      address: address,
      phone: phone,
      uidCategoria: categoria,
      hora_abierto: abrir,
      hora_cerrar: cerrar,
      direccion: direccion,
      activo: true,
      email: user.email,
      uidSucursal: uidSucursal,
      roles: {
        restaurante: true
      },
      tipo: 3,
      uid: user.uid,
      photourl: img,
      pago: 'Habil'
    };
    return userRef.set(data, { merge: true });
  }

  public updateConvenio(
    abrir,
    cerrar,
    user,
    username,
    contacto,
    address,
    phone,
    categoria,
    direccion,
    uidSucursal,
    img
  ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user}`
    );
    const data: UserInterface = {
      username: username,
      contacto: contacto,
      address: address,
      phone: phone,
      uidCategoria: categoria,
      hora_abierto: abrir,
      hora_cerrar: cerrar,
      direccion: direccion,
      activo: true,
      uidSucursal: uidSucursal,
      roles: {
        restaurante: true
      },
      tipo: 3,
      uid: user,
      photourl: img,
      pago: 'Habil'
    };
    return userRef.update(data).then(() => this.alertService.success('Convenio actualizado correctamente.'));
  }

  getAllRestaurantes() {
    return (this.restaurantes = this.restaurantesCollection
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as UserInterface;
            data.uid = action.payload.doc.id;
            return data;
          });
        })
      ));
  }
  deleteRestaurante(uid: string) {
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
    this.restauranteDoc = this.afs.doc<FileRes>(`users/${uid}`);
    this.restauranteDoc.delete();
    // this.alertService.info('El convenio se elimino correctamente');
  }

  isUserRestaurante(userUid) {
    return this.afs.doc<FileRes>(`users/${userUid}`).valueChanges();
  }
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  desactivarConvenio(uid): void {
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
    // this.alertService.info('El convenio se inhabilito correctamente');
  }
  activarConvenio(uid): void {
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
    // this.alertService.info('El convenio se habilito correctamente');
  }

  getConvenios(uidSucursal) {
    return this.afs.collection('users', ref =>
      ref.where('tipo', '==', 3).where('uidSucursal', '==', uidSucursal)
    ).valueChanges();
  }
}
