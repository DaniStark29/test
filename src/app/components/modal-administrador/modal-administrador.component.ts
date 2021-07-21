import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdministradorDataService } from '../../service/administrador/administrador-data.service';
import { UserInterface } from 'src/app/models/user';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-modal-administrador',
  templateUrl: './modal-administrador.component.html',
  styleUrls: ['./modal-administrador.component.css']
})
export class ModalAdministradorComponent implements OnInit {
  @ViewChild('btnClose') btnClose: ElementRef;

  public email: string = '';
  public password: string = '';
  public username: string = '';
  public lastname: string = '';
  public address: string = '';
  public phone: string = '';
  // Sucursales
  uidUser: string = null;
  public usuario: any = {};
  Uidsucursal: string = '';
  user: UserInterface = {
    uid: '',
    username: '',
    email: '',
    direccion: '',
    uidSucursal: '',
    roles: {}
  };

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(public authService: AdministradorDataService, public router: Router,
    private storage: AngularFireStorage, public db: AngularFirestore,
    private alertService: AlertService,

    ) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;


  ngOnInit() {
    // Sucursal
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe( data => {
          this.usuario = data;
          console.log('usuario', data);
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          console.log('BD', this.Uidsucursal);
          // this.getListRestaurante(this.Uidsucursal);
          console.log('usuer', this.Uidsucursal);
        });
        }
    });
  }

  onSaveAdministrador( formAdmin: NgForm) {
    if ( this.username === '' || this.lastname === '' || this.address === '' ||
    this.phone === '' || this.email === '' || this.password === '' || !this.urlImage) {
        this.alertService.warning('Algunos campos no estan completos.');
        } else if (this.password.length < 7  ) {
        this.alertService.warning('La contraseña debe tener más de 7 caracteres.');
        } else {
    this.authService.registerUser(this.username, this.lastname, this.address, this.phone, this.email, this.password, this.Uidsucursal)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then(() => {
              formAdmin.resetForm();
             this.btnClose.nativeElement.click();
            }).catch((error) => this.alertService.danger(error));
          }
        });
      }).catch(err => this.alertService.danger(err));
    }
  }
  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `administrador/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
   console.log('id', id);
   console.log('file', file);
   console.log('filepath', filePath);
   console.log('ref', ref);
   console.log('id', id);
   console.log('urlimage', JSON.stringify(this.urlImage));
  }

}
