import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MenuInterface } from '../../../models/restaurante/menu';
import { MenuService } from '../../../service/restaurante-menu/menu.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.css']
})
export class ModalMenuComponent implements OnInit {

  constructor(public dataMenu: MenuService, private alertService: AlertService,
            private storage: AngularFireStorage,
    ) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  // estaSobreElemento = false;
  archivos: MenuInterface[] = [];
  id: null;
  // imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImage1: any;

  ngOnInit() {
    console.log('UserId', this.userUid);
    // console.log(this.dataMenu.selectedMenu);

  }

  onSaveMenu(formMenu: NgForm) {
    console.log('id', formMenu.value.id);
    if (formMenu.value.id === null || formMenu.value.id === undefined  ) {
      // Es un nuevo producto
        this.dataMenu.selectedMenu.userUid = this.userUid;
        this.dataMenu.guardarMenu(this.urlImage1, this.dataMenu.selectedMenu.nombre, this.dataMenu.selectedMenu.estado,
       this.dataMenu.selectedMenu.precio, this.dataMenu.selectedMenu.descripcion, this.userUid);
      console.log('save', this.dataMenu.selectedMenu);
    } else {
      // Cuando se edita un producto.
      console.log('id', this.dataMenu.selectedMenu.id);
      this.dataMenu.editarMenu(this.urlImage1, formMenu.value );
    }
    formMenu.resetForm();
    this.btnClose.nativeElement.click();
  }

  onUpload(e) {
    console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `menus/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() =>
    ref.getDownloadURL().subscribe( r => {
     this.urlImage1 = this.urlImage = r;
      console.log('foto', r);
    })
    )
    )
    .subscribe();
  }
}
