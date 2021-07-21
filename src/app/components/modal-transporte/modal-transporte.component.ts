import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
// import { TransporteInterface } from '../../models/transporte';
import { TransporteService } from '../../service/transporte/transporte.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-modal-transporte',
  templateUrl: './modal-transporte.component.html',
  styleUrls: ['./modal-transporte.component.css']
})
export class ModalTransporteComponent implements OnInit {

  constructor(public dataTra: TransporteService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

  onSaveTransporte(formTransporte: NgForm): void {
    if (formTransporte.value.id === null) {
      // formTransporte.value.useUid = this.userUid;
      this.dataTra.addTransporte(formTransporte.value);
    } else {
      this.dataTra.updateTransporte(formTransporte.value);
    }
    formTransporte.resetForm();
    this.btnClose.nativeElement.click();
  }



}
