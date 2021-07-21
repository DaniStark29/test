import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email:string = '';
  public password:string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor( public authService: AuthService, public router: Router, private storage: AngularFireStorage ) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  ngOnInit() {
  }

  // onAddUser() {
  //   this.authService.registerUser(this.email, this.password)
  //     .then((res) => {
  //       this.authService.isAuth().subscribe(user => {
  //         if (user) {
  //           user.updateProfile({
  //             displayName: '',
  //             photoURL: this.inputImageUser.nativeElement.value
  //           }).then(() => {
  //             this.router.navigate(['admin/list-sucursal']);
  //           }).catch((error) => console.log('error', error));
  //         }
  //       });
  //     }).catch(err => console.log('err', err.message));
  // }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

}
