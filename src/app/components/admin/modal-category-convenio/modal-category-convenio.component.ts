import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoriaConvenioService} from '../../../service/categoria/categoria-convenio.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/models/user';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-modal-category-convenio',
  templateUrl: './modal-category-convenio.component.html',
  styleUrls: ['./modal-category-convenio.component.css']
})
export class ModalCategoryConvenioComponent implements OnInit {
  @ViewChild('btnClose') btnClose: ElementRef;
  // imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImage1: any;

  user: UserInterface = {
    uid: '',
    username: '',
    roles: {},
    geolocalizacion: {}
   };
  public uidSucursal: string = null;
  public usuario: any = {};
  id: null;

  constructor(private storage: AngularFireStorage,
              public serv_cat: CategoriaConvenioService,
              private auth: AuthService,
              private afs: AngularFirestore,
              ) { }

  ngOnInit() {
    this.auth.isAuth().subscribe( user => {
      if (user) {
        this.user.uid = user.uid;
        this.user.username = user.displayName;
        // Consultamos los datos del usuario
        this.afs.doc(`users/${this.user.uid}`).valueChanges().subscribe( data => {
          this.usuario = data;
      // Extraemos el uid de la sucursal al que pertence
        this.uidSucursal = this.usuario.uidSucursal;
        console.log('uidSucursal', this.uidSucursal);
        // this.onSaveCategoria(null, this.uidSucursal);
      });
      }
    });
  }
  onSaveCategoria(formCategoria: NgForm) {
    console.log('idAdd', formCategoria.value.id);
    if (formCategoria.value.id === null || undefined ) {
      // Es un nuevo producto
        this.serv_cat.guardarCategoria(this.urlImage1, this.serv_cat.selectedCategoria.nombre, this.serv_cat.selectedCategoria.posicion,
          this.serv_cat.selectedCategoria.descripcion, this.uidSucursal);
      console.log('save', this.serv_cat.selectedCategoria);
    } else {
      // Cuando se edita un producto.
      console.log('idUpd', this.serv_cat.selectedCategoria.id);
      this.serv_cat.editarCategoria(this.urlImage1, formCategoria.value );
    }
    formCategoria.resetForm();
    this.btnClose.nativeElement.click();
  }
  onUpload(e) {
    console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `categorias_convenio/profile_${id}`;
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
