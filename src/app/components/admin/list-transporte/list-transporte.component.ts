import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../../../service/transporte/transporte.service';
import { TransporteInterface } from '../../../models/transporte';

@Component({
  selector: 'app-list-transporte',
  templateUrl: './list-transporte.component.html',
  styleUrls: ['./list-transporte.component.css']
})
export class ListTransporteComponent implements OnInit {

  constructor(public dataTra: TransporteService ) { }
  public transportes: TransporteInterface[];
  public filterPost = '';
  pageActual: number = 1;
  data: string;

  ngOnInit() {
    this.getListTransportes();
  }

  getListTransportes() {
    this.dataTra.getAllTransportes().subscribe( transportes => {
      this.transportes = transportes;
      this.data = JSON.stringify(this.transportes);
    });
  }
  onDeleteTransporte(idTransporte: string): void {
    const confirmacion = confirm('¿Estas seguro de eliminar este registro?');
    if ( confirmacion ) {
      this.dataTra.deleteTransporte(idTransporte);
    }
  }
  onPreUpdateTransporte( transporte: TransporteInterface) {
    this.dataTra.selectedTransporte = Object.assign({}, transporte);
  }

}
