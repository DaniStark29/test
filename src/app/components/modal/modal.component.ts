import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../service/data-api.service';
import { SucursalInterface } from '../../models/sucursal';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
    console.log('UserId', this.userUid);

  }

  onSaveSucursal(formSucursal: NgForm): void {
    if (formSucursal.value.id === null ) {
      // New
      formSucursal.value.userUid = this.userUid;
      this.dataApi.addSucursal(formSucursal.value);
    } else {
      // Update
      this.dataApi.updateSucursal(formSucursal.value);
    }
    formSucursal.resetForm();
    this.btnClose.nativeElement.click();
  }

}
