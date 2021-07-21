import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../../../service/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl} from '@angular/forms';
import * as moment from 'moment';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-cortes-convenio',
  templateUrl: './cortes-convenio.component.html',
  styleUrls: ['./cortes-convenio.component.css']
})
export class CortesConvenioComponent implements OnInit {

  // Inicia tabla
  displayedColumns: string[] = ['clave', 'fecha', 'total', 'detalle'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Servidor
  server: any = 'https://proyectosinternos.com/bm/bm/index.php/reporte/';

  // Variables
  userId: any;
  range: any;
  rango: any = {};
  servPU: any;
  fechaInicio: any;
  fechaUltimo: any;
  // Variables Servicios
  totalServicios: any;
  totalIngresos: any;

  constructor( public authService: AuthService, public http: Http, public alertS: AlertService ) {
  }

  ngOnInit() {
    // Obtener usuario-covenio ID
    this.authService.isAuth().subscribe((user: any) => {
      console.log('User: ', user.uid);
      this.userId =  user.uid;
      this.getService(this.userId);
      this.getServicePrimerUltimo(this.userId);
    });
    // Formulario rango de fechas
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
    // Formatear fecha a milisegundos
    // const fecha = moment('2020-06-30T05:00:00.000Z').format('MM-DD-YYYY');
    // const ms = moment(fecha).format('x');
    // console.log('Esta es la fecha: ', ms);
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getService(userId: any) {
    const url = this.server + `convenio_servicios/${userId}`;
    this.http.get(url).subscribe((res) => {
      const servicios = res.json().servicios;
      this.dataSource.data = servicios;
      this.totalServicios = servicios.length;
      this.totalIngresos = servicios.reduce((acc, obj) => acc + (obj.totalProd), 0);
      console.log('getService: ', this.totalIngresos);

    });
  }
  getServicePrimerUltimo(userId: any) {
    // Obteniendo fechas del primer y ultimo servicio
    const url = this.server + `convenio_primero_ultimo/${userId}`;
    this.http.get(url).subscribe((res) => {
      const fechas = res.json().fecha_servicios;
       this.fechaInicio = moment(Number(fechas.fecha_inicio)).format('D MMM YYYY');
       this.fechaUltimo = moment(Number(fechas.fecha_ultimo)).format('D MMM YYYY');
    });
  }
  clearFormDateRange() {
    this.range.reset();
  }
  getServiceRange() {
    // Obteniendo rango de fechas
    // console.log('End: ', JSON.stringify(this.range.value));
    // Obteniendo start an end date
    const start = JSON.stringify(this.range.value.start);
    const end = JSON.stringify(this.range.value.end);
    // console.log('Start: ', start, '\n', 'End: ', end);
    if (start !== 'null' && end !== 'null') {
      // Remplazando comillas dobles por simples
      const inico = start.replace(/["]/g, '');
      const final = end.replace(/["]/g, '');
      // Convirtiendo fechas a milisegundos
      const fechaInicio = moment(inico).format('MM-DD-YYYY');
      const Inicio_ms = moment(fechaInicio).format('x');
      const fechaFinal = moment(final).format('MM-DD-YYYY');
      const Final_ms = moment(fechaFinal).format('x');
      // console.log('Start: ', Inicio_ms);
      // console.log('End: ', Final_ms);
      // Obteniendo servicios del rango de fechas
      const url = this.server + `convenio_rango_fecha/${this.userId}/${Inicio_ms}/${Final_ms}`;
      this.http.get(url).subscribe((res) => {
        const serv_date_range = res.json().servicios;
        console.log('Respuesta', serv_date_range.length);
        const sdr = serv_date_range.length;
        if (sdr > 0) {
          this.dataSource.data = serv_date_range;
          this.alertS.success('¡ Búsqueda exitosa !');
        } else {
          this.alertS.info('No se encontraron resultados en el rango de fechas ingresado');
        }
      });
    } else {
      this.alertS.warning('No se especifico un rango de fechas para la búsqueda');
    }
  }


}
