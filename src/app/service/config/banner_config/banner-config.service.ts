import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AlertService } from 'ngx-alerts';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BannerConfigService {
  private CARPETA_IMAGENES = 'banners';
  public uid: any;
  public bannerDoc: AngularFirestoreDocument<any>;
  data: any = {};
  constructor(private alertService: AlertService, public afs: AngularFirestore) { }

  // cargarImagenesFirebase( imagenes: any[], descripcion, fecha, estado, modulo, uidSucursal) {
  //   descripcion = descripcion;
  //   fecha = fecha;
  //   estado = estado;
  //   modulo = modulo;
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
  //           (error) => console.error('Error al subir', error),
  //           () => {
  //            this.alertService.success('Bien! Se agrego el banner.');
  //            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //            item.photourl = downloadURL;
  //            item.estaSubiendo = false;
  //           this.guardarImagen({
  //             descripcion: descripcion,
  //             fecha: fecha,
  //             estado: estado,
  //             modulo: modulo,
  //             uidSucursal: uidSucursal,
  //             photourl: item.photourl
  //           });
  //           });
  //           });
  //   }
  // }
  public guardarImagen(photourl: string, descripcion: string, fecha: string, estado: boolean, modulo: string,
   uidSucursal: string, url: string ) {
   this.afs.collection(`/${ this.CARPETA_IMAGENES }`).add({
    descripcion: descripcion,
    fecha: fecha,
    estado: estado,
    modulo: modulo,
    uidSucursal: uidSucursal,
    photourl: photourl,
    url: url
   }).then( ref => {
    console.log('id', this.uid = ref.id);
    this.afs.collection('banners').doc(this.uid).update({
      uid: this.uid
    });
   }
    );
    this.alertService.success('Se agrego correctamente el banner.');
}
// Delete
deleteMenu( idB: string) {
  this.bannerDoc = this.afs.doc<any>(`banners/${idB}`);
  this.bannerDoc.delete();
}
// Update
updateEstadoBanner(uidB, estado): void {
  this.data = {
    estado: estado
  };
  this.bannerDoc = this.afs.doc<any>(`banners/${uidB}`);
  this.bannerDoc.update(this.data);
  console.log('update', this.data);
}
getBanner(uidSucursal) {
  return this.afs.collection('banners', ref =>
    ref.where('uidSucursal', '==', uidSucursal)
  ).valueChanges();
}
}
