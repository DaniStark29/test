import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInterface } from 'src/app/models/user';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-modal-repartidor',
  templateUrl: './modal-repartidor.component.html',
  styleUrls: ['./modal-repartidor.component.css']
})
export class ModalRepartidorComponent implements OnInit {
  @ViewChild('btnClose') btnClose: ElementRef;

  public email: string = null;
  public password: string = null;
  public username: string = null;
  public lastname: string = null;
  public address: string = null;
  public phone: string = null;
  public placa: string = null;
  public marca: string = null;

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
  urlImage1: any;

  constructor(public authService: AuthService,
              public router: Router,
              private storage: AngularFireStorage,
              public db: AngularFirestore,
              private alertService: AlertService,
              ) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;

  ngOnInit() {
    console.log('user', this.user);
    this.authService.isAuth().subscribe(user => {
      if (user) {
       this.uidUser = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe( data => {
          this.usuario = data;
          // tslint:disable-next-line:no-unused-expression
          this.Uidsucursal = this.usuario.uidSucursal;
          console.log('usuer', this.Uidsucursal);
        });
        }
    });
    }

    onUpload(e) {
      console.log('subir', e.target.files[0]);
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      const filePath = `repartidor/profile_${id}`;
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
    // onImg (img) {
    //   this.onSaveRepartidor(null, img);
    // }
    onSaveRepartidor( formRepartidor: NgForm) {
      if (this.username === '' || this.lastname === '' || this.marca === ''  || this.placa === '' ||
        this.email === '' || this.password === '' || !this.urlImage ) {
        this.alertService.warning('Algunos campos no estan completos.');
        } else if (this.password.length < 7  ) {
        this.alertService.warning('La contraseña debe tener más de 7 caracteres.');
        } else {
          this.authService.newRegister(this.username, this.lastname, this.address, this.phone, this.marca, this.placa,
            this.email, this.password, this.Uidsucursal, this.urlImage1)
           .then((res) => {
             this.authService.isAuth().subscribe(user => {
               if (user) {
                 user.updateProfile({
                   displayName: '',
                   photoURL: this.inputImageUser.nativeElement.value
                 }).then(() => {
                 }).catch((error) => this.alertService.danger(error));
               }
             });
           }).catch(err => this.alertService.danger(err));
           formRepartidor.resetForm();
           this.btnClose.nativeElement.click();
        }
      }
  }
