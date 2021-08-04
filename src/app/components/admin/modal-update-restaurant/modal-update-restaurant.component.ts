import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";
import { RestauranteDataService } from "../../../service/restaurante/restaurante-data.service";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { AlertService } from "ngx-alerts";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs/internal/Observable";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-modal-update-restaurant",
  templateUrl: "./modal-update-restaurant.component.html",
  styleUrls: ["./modal-update-restaurant.component.css"],
})
export class ModalUpdateRestaurantComponent implements OnInit {
  // maps
  title = "AGM project";
  latitude: number = null;
  longitude: number = null;
  zoom: number;
  address: string;
  idRest: any;
  restaurante: any = {};
  public direccion: {};
  public geoCoder;
  public geoCoderF: any;
  @ViewChild("search") search: any;
  public searchElementRef: ElementRef;
  // Listado de Categorías para visualizar en la tabla
  categorias: any;
  // Imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  public urlImage1: any;
  public Uidsucursal: any;

  constructor(
    public mapsAPILoader: MapsAPILoader,
    public ngZone: NgZone,
    public db: AngularFirestore,
    public dataRes: RestauranteDataService,
    public route: ActivatedRoute,
    private alertService: AlertService,
    public authService: RestauranteDataService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.idRest = this.route.snapshot.params["uid"];
    this.getRest();
    this.categoriaList();

    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      setTimeout(() => {
        const autocomplete = new google.maps.places.Autocomplete(
          this.search.nativeElement,
          {
            types: ["address"],
            componentRestrictions: { country: "mx" },

          }
        );

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            // get the place result
            const place: google.maps.places.PlaceResult =
              autocomplete.getPlace();
            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            // set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 20; 
            this.getAddress(this.latitude, this.longitude); 
          });
        });
      }, 1000);
    });
  }

  // trae todos las categorías
  categoriaList() {
    this.db
      .collection("categoria_critico")
      .valueChanges()
      .subscribe((cat) => {
        this.categorias = cat;
      });
  }

  // traer restaurante
  getRest() {
    this.db
      .collection("users")
      .doc(this.idRest)
      .valueChanges()
      .subscribe((rest) => {
        this.restaurante = rest;
        this.latitude = this.restaurante.direccion.latitude;
        this.longitude = this.restaurante.direccion.longitude;
        this.urlImage1 = this.restaurante.photourl;
        this.Uidsucursal = this.restaurante.uidSucursal;
        this.getAddress(this.latitude, this.longitude);
      });
  }

  // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => { 
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }
  getAddress(latitude, longitude) {    
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 20;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }
  markerDragEnd($event: any) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }
  // subir convenio
  cargarImagenes(formAdmin: NgForm) {
    const abierto = moment(this.restaurante.hora_abierto, "HHmmss");
    const abiertoFormat = abierto.format("HH:mm:ss");
    const cerrar = moment(this.restaurante.hora_cerrar, "HHmmss");
    const cerrarFormat = cerrar.format("HH:mm:ss");
    if (
      this.restaurante.username === "" ||
      this.restaurante.contacto === "" ||
      this.restaurante.address === "" ||
      this.restaurante.phone === "" ||
      this.restaurante.hora_cerrar === "" ||
      this.restaurante.uidCategoria === "" ||
      this.restaurante.direccion === "" ||
      !this.urlImage1
    ) {
      this.alertService.warning("Algunos campos no estan completos.");
    } else {
      this.direccion = new firebase.firestore.GeoPoint(
        this.latitude,
        this.longitude
      );
      
      this.authService.updateConvenio(
        abiertoFormat,
        cerrarFormat,
        this.idRest,
        this.restaurante.username,
        this.restaurante.contacto,
        this.address,
        this.restaurante.phone,
        this.restaurante.uidCategoria,
        this.direccion,
        this.Uidsucursal,
        this.urlImage1
      );
      // formAdmin.resetForm();
    }
  }
  // imagen
  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `users/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          ref.getDownloadURL().subscribe((r) => {
            this.urlImage1 = this.urlImage = r;
          })
        )
      )
      .subscribe();
  }
}
