import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { AdministradorDataService } from '../../../service/administrador/administrador-data.service';
import { UserInterface } from '../../../models/user';
import { AlertService } from 'ngx-alerts';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public afAuth: AngularFireAuth, private router: Router, public authService: AuthService,
     public dataAdmn: AdministradorDataService, private alertService: AlertService  ) { }
     public admins: UserInterface[];
     data: string;
    public email: string = '';
    public password: string = '';
  ngOnInit() {
   // this.getListAdmn();

  }
  // getListAdmn () {
  //   this.dataAdmn.getAllAdministradores().subscribe( admins => {
  //     console.log('Admins', admins);
  //    this.admins = admins;
  //  });
  // }

  // onLoginGoogle() {
  //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  //   this.router.navigate(['admin/list-sucursale']);
  // }

  onLogin(): void {
    // console.log('email', this.email);
    // console.log('pass', this.password);
      this.authService.loginEmailUser(this.email, this.password)
    .then((res) => {
       // if (this.admins ) {
        this.router.navigate(['admin/home-admin']);
       // }
    }).catch(err => this.alertService.danger(err.message));
   }
  //  getListAdmn() {
  //  }
  logOut() {
    this.afAuth.signOut();
  }
}
