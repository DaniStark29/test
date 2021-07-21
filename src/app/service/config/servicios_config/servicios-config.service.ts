import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';


@Injectable({
  providedIn: 'root'
})
export class ServiciosConfigService {

  constructor(public afs: AngularFirestore,
              public alert: AlertService,) {

  }
  // tarifas
  public tarifaMenuMin: Observable<any>;
  public tarifaMenuMinDoc:  AngularFirestoreCollection<any>;
  // Menu
  public costo_menu: Observable<any>;
  public costo_fijo_menu:  AngularFirestoreCollection<any>;
  public costo_fijo_menu_doc:  AngularFirestoreDocument<any>;
  // Regular
  public costo: Observable<any>;
  public costo_fijo:  AngularFirestoreCollection<any>;
  public costo_fijo_doc:  AngularFirestoreDocument<any>;
  // tarifas
  public tarifa: Observable<any>;
  public tarifaDoc:  AngularFirestoreCollection<any>;
  // tarifasMenu
  public tarifaMenu: Observable<any>;
  public tarifaMenuDoc:  AngularFirestoreCollection<any>;
  // metodos de pago
  public pago: Observable<any>;
  public pagoDoc:  AngularFirestoreCollection<any>;
  // Transporte
  public transporte: Observable<any>;
  public transporteDoc: AngularFirestoreCollection<any>;
  // Servicio regular
  getCostoFijo(id: string) {
    this.costo_fijo = this.afs.collection<any>('costos_fijos', ref => ref.where('uidSucursal', '==', id));
    this.costo = this.costo_fijo.valueChanges();
    return this.costo = this.costo_fijo.snapshotChanges()
    .pipe(map(changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as any;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
   }
  //  Servicio Menu
  getCostoFijoMenu(id: string) {
    console.log('uidsucursal', id);
    this.costo_fijo_menu = this.afs.collection<any>('costos_fijo_menu', ref => ref.where('uidSucursal', '==', id));
    this.costo_menu = this.costo_fijo_menu.valueChanges();
    return this.costo_menu = this.costo_fijo_menu.snapshotChanges()
    .pipe(map(changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as any;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
   }
   // Servicios regulares
   updateArranqueService(costo: any, uid) {
     console.log('costoForm', costo.arranque);
     console.log('costoFormid', uid);
       this.afs.doc<any>(`costos_fijos/${uid}`).update({
         arranque: costo.arranque
       });
       this.alert.success('Tarifa actualizada');
   }
   // Servicios menu
   updateArranqueServiceMenu(costo: any, uid) {
    console.log('costoForm', costo.arranque);
    console.log('costoFormid', uid);
      this.afs.doc<any>(`costos_fijo_menu/${uid}`).update({
        arranque: costo.arranque
      });
      this.alert.success('Tarifa actualizada');

  }
  getTarifaService(id: string) {
    this.tarifaDoc = this.afs.collection<any>('tarifas', ref => ref.where('uidSucursal', '==', id));
    this.tarifa = this.tarifaDoc.valueChanges();
    return this.tarifa = this.tarifaDoc.snapshotChanges()
    .pipe(map(changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as any;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }
  updateTarifaService(tarifa: any, uid) {
      console.log('heyy', tarifa.distancia, tarifa.tiempo);
      this.afs.doc<any>(`tarifas/${uid}`).update({
        distancia: tarifa.distancia,
        tiempo: tarifa.tiempo
      });
      this.alert.success('Tarifas actualizadas');
  }
  getPagoService(id: string) {
    this.pagoDoc = this.afs.collection<any>('metodos_pagos', ref => ref.where('uidSucursal', '==', id));
    this.pago = this.pagoDoc.valueChanges();
    return this.pago = this.pagoDoc.snapshotChanges()
    .pipe(map(changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as any;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }

  updatePagoService(efectivo, tarjeta, uid) {
    console.log('metodos', efectivo, tarjeta, uid);
     this.afs.doc<any>(`metodos_pagos/${uid}`).update({
      Efectivo: efectivo,
      Tarjeta: tarjeta
    });
    this.alert.success('Se actualizo correctamente');

  }
  getTransporteService(id: string) {
    this.transporteDoc = this.afs.collection<any>('transportes_config', ref => ref.where('uidSucursal', '==', id));
    this.transporte = this.transporteDoc.valueChanges();
    return this.transporte = this.transporteDoc.snapshotChanges()
    .pipe(map(changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as any;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }
  updateTransporteService(moto, car, uid) {
    this.afs.doc<any>(`transportes_config/${uid}`).update({
      moto: moto,
      car: car
    });
    this.alert.success('Se actualizo correctamente');
  }
  // Menu
  getTarifaServiceMenu(id: string) {
    this.tarifaMenuDoc = this.afs.collection<any>('tarifas_menu', ref => ref.where('uidSucursal', '==', id));
    this.tarifaMenu = this.tarifaMenuDoc.valueChanges();
    return this.tarifaMenu = this.tarifaMenuDoc.snapshotChanges()
    .pipe(map(changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as any;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }
  updateTarifaServiceMenu(tarifa: any, uid) {
    console.log('heyy', tarifa.distancia, tarifa.tiempo);
    this.afs.doc<any>(`tarifas_menu/${uid}`).update({
      distancia: tarifa.distancia,
      tiempo: tarifa.tiempo
    });
    this.alert.success('Tarifas actualizadas');
}
// MenuMin
getTarifaServiceMenuMin(id: string) {
  console.log('uid sucursa', id);
  this.tarifaMenuMinDoc = this.afs.collection<any>('tarifas_menu_min', ref => ref.where('uidSucursal', '==', id));
  this.tarifaMenuMin = this.tarifaMenuMinDoc.valueChanges();
  return this.tarifaMenuMin = this.tarifaMenuMinDoc.snapshotChanges()
  .pipe(map(changes => {
    return changes.map( action => {
      const data = action.payload.doc.data() as any;
      data.uid = action.payload.doc.id;
      return data;
    });
  }));
}
// Servicios menu
updateArranqueServiceMenuMin(costo: any, uid) {
  console.log('costoFormid', uid);
    this.afs.doc<any>(`tarifas_menu_min/${uid}`).update({
      costo: costo.costo
    });
    this.alert.success('Tarifa actualizada');
}
}
