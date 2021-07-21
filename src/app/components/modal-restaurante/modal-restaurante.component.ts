import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { RestauranteDataService } from '../../service/restaurante/restaurante-data.service';
import { FileRes } from '../../models/file-res';

@Component({
  selector: 'app-modal-restaurante',
  templateUrl: './modal-restaurante.component.html',
  styleUrls: ['./modal-restaurante.component.css']
})
export class ModalRestauranteComponent implements OnInit {
  @ViewChild('btnClose') btnClose: ElementRef;
  estaSobreElemento = false;
  archivos: FileRes[] = [];

  public email: string = '';
  public password: string = '';
  public username: string = '';
  public contacto: string = '';
  public address: string = '';
  public phone: string = '';
  public tipo: number = 3;
  public activo: boolean = true;

  // public photoURL: string = '';
  // data: any[];
  // public selectedUser: UserInterface = { roles: {} };

  constructor(public authService: RestauranteDataService, public router: Router,
    private storage: AngularFireStorage, public db: AngularFirestore) { }


  ngOnInit() {
  }
  // cargarImagenes(formAdmin: NgForm) {
  //   this.authService.cargarImagenesFirebase(this.archivos, this.email, this.password, this.username,
  //      this.contacto, this.address, this.phone);
  //   formAdmin.resetForm();
  //   this.limpiarArchivos();
  //   // this.btnClose.nativeElement.click();
  // }
  limpiarArchivos() {
    this.archivos = [];
  }
}
