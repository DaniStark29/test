import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { NgForm } from '@angular/forms';
import { RepartidorDataService } from '../../../service/repartidor/repartidor-data.service';

@Component({
  selector: 'app-modal-update-repartidor',
  templateUrl: './modal-update-repartidor.component.html',
  styleUrls: ['./modal-update-repartidor.component.css']
})
export class ModalUpdateRepartidorComponent implements OnInit {
  public idRepa: any;
  public repartidor: any = {};
  // Imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  public urlImage1: any;
  public Uidsucursal: any;
  constructor(
    public route: ActivatedRoute,
    public db: AngularFirestore,
    public storage: AngularFireStorage,
    public alertService: AlertService,
    public authService: RepartidorDataService
  ) {}

  ngOnInit() {
    this.idRepa = this.route.snapshot.params['uid'];
    // console.log('uidRepa: ', this.idRepa);
    this.getRepa();
  }

  getRepa() {
    this.db
      .collection('users')
      .doc(this.idRepa)
      .valueChanges()
      .subscribe(repa => {
        this.repartidor = repa;
        console.log('repartidor', this.repartidor);
        this.urlImage1 = this.repartidor.photourl;
        this.Uidsucursal = this.repartidor.uidSucursal;
      });
  }

  onSaveRepartidor(formRepartidor: NgForm) {
    if (
      this.repartidor.username === '' ||
      this.repartidor.lastname === '' ||
      this.repartidor.marca === '' ||
      this.repartidor.placa === '' ||
      !this.urlImage1
    ) {
      this.alertService.warning('Algunos campos no estan completos.');
    } else {
      this.authService.updateRepartidor(
        this.idRepa,
        this.repartidor.username,
        this.repartidor.lastname,
        this.repartidor.address,
        this.repartidor.phone,
        this.repartidor.marca,
        this.repartidor.placa,
        this.Uidsucursal,
        this.urlImage1
      );
      formRepartidor.resetForm();
    }
  }
  onUpload(e) {
    console.log('subir', e.target.files[0]);
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `repartidor/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          ref.getDownloadURL().subscribe(r => {
            this.urlImage1 = this.urlImage = r;
            console.log('foto', r);
          })
        )
      )
      .subscribe();
  }
}
