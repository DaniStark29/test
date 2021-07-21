import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { UserInterface } from '../../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private authService: AuthService, public db: AngularFirestore ) { }
  user: UserInterface = {
    username: '',
    email: '',
    // photoUrl: '',
    roles: {},
    geolocalizacion: {}
  };
  uidUser: string = null;
  public usuario: any = {};

    public providerId: string = 'null';
  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
       this.uidUser = this.user.uid = user.uid;
       this.user.username = user.displayName;
       this.user.email = user.email;
       this.user.photourl = user.photoURL;
       this.providerId = user.providerData[0].providerId;
       this.db.doc(`users/${this.uidUser}`).valueChanges().subscribe( data => {
       this.usuario = data;
          console.log('usuer', this.usuario);
        });
        }
    });
  }

}
