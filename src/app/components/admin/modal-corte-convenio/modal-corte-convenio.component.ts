import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { AngularFirestore} from '@angular/fire/firestore';
import { CortesService } from 'src/app/service/corte/cortes.service';

@Component({
  selector: 'app-modal-corte-convenio',
  templateUrl: './modal-corte-convenio.component.html',
  styleUrls: ['./modal-corte-convenio.component.css']
})
export class ModalCorteConvenioComponent implements OnInit {
  fechaInicio: any;
  fechaFin: any;
  date1: any;
  date2: any;
  cortes: any[];
  convenio: any[];
  // Total de los productos por servicio
  totalServicios: number;
  // Costo x servicio. Ejemplo 25 por servicio
  costoxservicio: number;
  // Diferencia de numero de servicios menos total de servicios .lenght
  diferenciaConvenio: number;
  // Total de numero de servicios * costoxservicio
  productoServicios: number;
  // No. de servicios
  noServicios: number;
  // suscripcion
  suscripcion: number;


  constructor(public afs: AngularFirestore,
              public serviceCorte: CortesService) { }
  @Input() convenioUid: string = null;


  ngOnInit() {
    // console.log('convenio uid', this.convenioUid);
    // this.getConvenioInfo();
  }
  // get() {
  //   console.log('id', this.convenioUid);
  //   this.corteFiltroConvenio(null, null, this.convenioUid);
  // }
  corteFiltroConvenio(fechaI, fechaF) {
    console.log('fechas', fechaI, fechaF);
    // seteando variables a milisegundos
    console.log('Primer filtro', this.date1 = moment(fechaI).format('x'), 'fin', this.date2 = moment(fechaF).format('x'));
    this.serviceCorte.getAllCortesConvenio(this.date1, this.date2).subscribe( cortes => {
      this.cortes = cortes;
      this.totalServicios = this.cortes.reduce((
        acc,
        obj,
      ) => acc + (obj.totalProductos),
      0);
      // Asiganamos el costo x servicio a 25
      this.suscripcion = 600;
      this.costoxservicio = 25;
      // Extraemos el numero de servicios
      this.noServicios = this.cortes.length;
      // producto de costoxservicio * noservicios
      this.productoServicios = (this.costoxservicio * this.noServicios);
      // diferencia de productoServicios - total servicios
      this.diferenciaConvenio = (this.totalServicios - this.productoServicios);


      console.log('cortes', cortes);
    });
    this.serviceCorte.getListConvenio().subscribe( convenio => {
      this.convenio = convenio;
      console.log('convenio', convenio);
    });
  }
}
