import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterfaceRes } from '../../models/restaurante';
import { RestauranteDataService } from '../../service/restaurante/restaurante-data.service';
import { AdministradorDataService } from '../../service/administrador/administrador-data.service';
import { AngularFirestore } from '@angular/fire/firestore';
declare var $: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private afsAuth: AngularFireAuth,
    public dataRes: RestauranteDataService,
    public dataAdmin: AdministradorDataService,
    public db: AngularFirestore) {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.userUid = this.user.uid = user.uid;
        this.user.username = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.db.doc(`users/${this.userUid}`).valueChanges().subscribe(data => {
          this.usuario = data;
          console.log('ids', data);
        });
      }
    });
  }
  public isLogged: boolean = false;
  public isRestaurante: any = null;
  public userUid: string = null;
  public isAdmin: any = null;
  uidUser: string = null;
  public usuario: {};
  user: UserInterfaceRes = {
    username: '',
    email: '',
    photoUrl: '',
    roles: {}
  };
  ngOnInit() {
    this.getCurrentUser();
    // this.getUserRestaurante();
  }

  getCurrentUser() {
    // tslint:disable-next-line:no-shadowed-variable
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
        this.userUid = auth.uid;
        this.dataAdmin.isUserAdministrador(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('administrador');
        });
      } else {
        console.log('Not user logged');
        this.isLogged = false;
      }
    });
  }
  // getUserRestaurante() {
  //   this.dataRes.isAuth().subscribe( auth => {
  //     if (auth) {
  //       this.userUid = auth.uid;
  //       this.dataRes.isUserRestaurante(this.userUid).subscribe(userRoles => {
  //         this.isRestaurante = Object.assign({}, userRoles.roles).hasOwnProperty('restaurante');
  //       })
  //     }
  //   })
  // }
  onLogout() {
    this.afsAuth.signOut();
  }

}
