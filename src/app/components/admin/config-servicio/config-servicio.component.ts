import { Component, OnInit } from '@angular/core';
import { ServiciosConfigService } from 'src/app/service/config/servicios_config/servicios-config.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/models/user';


@Component({
  selector: 'app-config-servicio',
  templateUrl: './config-servicio.component.html',
  styleUrls: ['./config-servicio.component.css']
})
export class ConfigServicioComponent implements OnInit {
  public costos: any[];
  public costos_menu: any[];
  public costos_menu_min: any[];
  public tarifas: any[];
  public tarifas_menu: any[];
  public pagos: any[];
  public transportes: any[];
  public efectivo: false;
  public tarjeta: false;
  theCheckbox: false;
  theCheckbox1: false;

  public moto: false;
  public car: false;
  theCheckbox2: false;
  theCheckbox3: false;

  // Sucursales
  uidUser: string = null;
  public usuario: any = {};
  Uidsucursal: string = null;
  user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    direccion: '',
    uidSucursal: '',
    roles: {}
  };
  constructor( public _servicio_config: ServiciosConfigService,
               public db: AngularFirestore,
               public authService: AuthService) { }

  ngOnInit() {
    // Sucursal
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe( data => {
          this.usuario = data;
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          this.getCosto(this.Uidsucursal);
          this.getCostoMenu(this.Uidsucursal);
          this.getTarifaMenu(this.Uidsucursal);
          this.getTarifaMenuMin(this.Uidsucursal);
          this.getTarifa(this.Uidsucursal);
          this.getPago(this.Uidsucursal);
          this.getTransporte(this.Uidsucursal);
          console.log('usuer', this.Uidsucursal);
        });
        }
    });
  }
// Servicios regulares
  getCosto(uidSucursal) {
    this._servicio_config.getCostoFijo(uidSucursal).subscribe( costo => {
      this.costos = costo;
      console.log('costo fijo', costo);
      });
  }
  // Servicios menu
  getCostoMenu(uidSucursal) {
    this._servicio_config.getCostoFijoMenu(uidSucursal).subscribe( costo => {
      this.costos_menu = costo;
      console.log('costo fijo menu', costo);
      });
  }
  // Servicios regulares
  updateArranque(formCosto: NgForm, uid) {
  const confirma = confirm('Se modificará el costo de arranque, ¿Está seguro de continuar?');
  if ( confirma ) {
    this._servicio_config.updateArranqueService(formCosto.value, uid);
  }
  }
  // Servicios del menu
  updateArranqueMenu(formCostoMenu: NgForm, uid) {
    const confirma = confirm('Se modificará el costo de arranque, ¿Está seguro de continuar?');
    if ( confirma ) {
      this._servicio_config.updateArranqueServiceMenu(formCostoMenu.value, uid);
    }
    }
  getTarifa(uidSucursal) {
    this._servicio_config.getTarifaService(uidSucursal).subscribe( tarifa => {
      this.tarifas = tarifa;
      console.log('tarifa ', tarifa);
    });
  }
  updateTarifas(formTarifa: NgForm, uid) {
  const confirma = confirm('Se modificará las tarifas de distancia y tiempo, ¿Está seguro de continuar?');
  if ( confirma ) {
    this._servicio_config.updateTarifaService(formTarifa.value, uid);
    console.log('aqui estoy perro', formTarifa.value);

  }
}
// Menu
getTarifaMenu(uidSucursal) {
  this._servicio_config.getTarifaServiceMenu(uidSucursal).subscribe( tarifa => {
    this.tarifas_menu = tarifa;
    console.log('tarifa ', tarifa);
  });
}
updateTarifasMenu(formTarifaMenu: NgForm, uid) {
  const confirma = confirm('Se modificará las tarifas de distancia y tiempo, ¿Está seguro de continuar?');
  if ( confirma ) {
    this._servicio_config.updateTarifaServiceMenu(formTarifaMenu.value, uid);
  }
}
// +++++ Inicio de metodo de pago +++++

getPago(uidSucursal) {
  this._servicio_config.getPagoService(uidSucursal).subscribe( (pago: any) => {
    this.pagos = pago;
    console.log('pago ', pago);
    this.pagos.forEach(data => {
      this.efectivo = data.Efectivo;
      console.log(this.efectivo);
      this.tarjeta = data.Tarjeta;
      console.log(this.tarjeta);
    });
  });

}

updateEfectivo(e, uid) {
  this.efectivo = e.target.checked;
  console.log("check", e.target.checked);
  console.log('valueE', this.efectivo);
  this.updatePago(this.efectivo, this.tarjeta, uid);
}
updateTarjeta(e, uid) {
  this.tarjeta = e.target.checked;
  console.log('check', e);
  console.log('valueT', this.tarjeta);
  this.updatePago(this.efectivo, this.tarjeta, uid);

}
updatePago(efectivo, tarjeta, uid) {
  const confirma = confirm('Se modificará el método pago, ¿Está seguro de continuar?');
  if ( confirma ) {
    this._servicio_config.updatePagoService(efectivo, tarjeta, uid);
  }
}

// +++++ Fin de metodo de pago +++++

getTransporte(uidSucursal) {
  this._servicio_config.getTransporteService(uidSucursal).subscribe( transporte => {
    this.transportes = transporte;
    console.log('transporte ', transporte);
  });
}
updateMoto(e, uid) {
  this.moto = e.target.checked;
  console.log('check', e);
  console.log('valueE', this.moto);
  this.updateTransporte(this.moto, this.car, uid);
}
updateCarro(e, uid) {
  this.car = e.target.checked;
  console.log('check', e);
  console.log('valueT', this.car);
  this.updateTransporte(this.car, this.car, uid);
}
updateTransporte(moto, car, uid) {
  const confirma = confirm('Se modificará los vehículos para el transporte, ¿Está seguro de continuar?');
  if ( confirma ) {
    this._servicio_config.updateTransporteService(moto, car, uid);
  }
}
// MenuMin
getTarifaMenuMin(uidSucursal) {
  this._servicio_config.getTarifaServiceMenuMin(uidSucursal).subscribe( tarifa => {
    this.costos_menu_min = tarifa;
    console.log('tarifa min menu ', tarifa);
  });
}
 // Servicios del menumin
 updateArranqueMenuMin(formCostoMenuMin: NgForm, uid) {
  const confirma = confirm('Se modificará el costo de arranque, ¿Está seguro de continuar?');
  if ( confirma ) {
    this._servicio_config.updateArranqueServiceMenuMin(formCostoMenuMin.value, uid);
  }
  }
}
