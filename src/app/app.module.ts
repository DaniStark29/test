import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSucursalesComponent } from './components/admin/list-sucursales/list-sucursales.component';
import { DeatailsSucursalComponent } from './components/admin/deatails-sucursal/deatails-sucursal.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterComponent } from './components/users/register/register.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { ListServiciosComponent } from './components/admin/list-servicios/list-servicios.component';
import { DetallePedidoComponent } from './components/admin/detalle-pedido/detalle-pedido.component';
import { CortesConvenioComponent } from './components/restaurante/cortes-convenio/cortes-convenio.component';
// Otros
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FilterSucursalPipe } from './pipes/filter-sucursal.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListRepartidoresComponent } from './components/admin/list-repartidores/list-repartidores.component';
import { ModalRepartidorComponent } from './components/modal-repartidor/modal-repartidor.component';
import { FilterRepartidorPipe } from './pipes/filter-repartidor.pipe';
import { ListAdministradoresComponent } from './components/admin/list-administradores/list-administradores.component';
import { ModalAdministradorComponent } from './components/modal-administrador/modal-administrador.component';
import { FilterRestaurantePipe } from './pipes/restaurante/filter-restaurante.pipe';
import { FilterAdministradorPipe } from './pipes/administrador/filter-administrador.pipe';
import { ListClientesComponent } from './components/admin/list-clientes/list-clientes.component';
import { ClienteFilterPipe } from './pipes/cliente/cliente-filter.pipe';
import { CsvModule } from '@ctrl/ngx-csv';
import { ListTransporteComponent } from './components/admin/list-transporte/list-transporte.component';
import { ModalTransporteComponent } from './components/modal-transporte/modal-transporte.component';
import { TransportePipe } from './pipes/transporte/transporte.pipe';
import { ListMenusComponent } from './components/restaurante/list-menus/list-menus.component';
import { ModalMenuComponent } from './components/restaurante/modal-menu/modal-menu.component';
import { ListRestaurantesComponent } from './components/admin/list-restaurantes/list-restaurantes.component';
import { ModalRestauranteComponent } from './components/modal-restaurante/modal-restaurante.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { ModalRComponent } from './components/modal-r/modal-r.component';
import { FilterMenuPipe } from './pipes/menu/filter-menu.pipe';
import { AgmCoreModule } from '@agm/core';
import { NgxPrintModule } from 'ngx-print';
import { FilterServiciosDiaPipe } from './pipes/servicios/filter-servicios-dia.pipe';
import { ListHostorialServiciosComponent } from './components/admin/list-hostorial-servicios/list-hostorial-servicios.component';
import { ServiciohUsuarioPipe } from './pipes/historial-servicios/servicioh-usuario.pipe';
import { ServiciohRepartidorPipe } from './pipes/historial-servicios/servicioh-repartidor.pipe';
import { ListCorteComponent } from './components/admin/list-corte/list-corte.component';
import { ListDetailServiciosComponent } from './components/admin/list-detail-servicios/list-detail-servicios.component';
import { ListPedidosComponent } from './components/restaurante/list-pedidos/list-pedidos.component';
import { PedidoPipe } from './pipes/restaurante/pedido/pedido.pipe';
import { DetailPedidosConvenioComponent } from './components/restaurante/detail-pedidos-convenio/detail-pedidos-convenio.component';
// tslint:disable-next-line:max-line-length
import { ListHistorialPedidosConveniosComponent } from './components/restaurante/list-historial-pedidos-convenios/list-historial-pedidos-convenios.component';

import { ConfigServicioComponent } from './components/admin/config-servicio/config-servicio.component';
// plugins
import { AlertModule } from 'ngx-alerts';
import { AgmDirectionModule } from 'agm-direction';
import { ConfigBannerComponent } from './components/admin/config-banner/config-banner.component';
import { HttpModule } from '@angular/http';
import { ListCategoryConvenioComponent } from './components/admin/list-category-convenio/list-category-convenio.component';
import { ModalCategoryConvenioComponent } from './components/admin/modal-category-convenio/modal-category-convenio.component';
import { ModalCorteConvenioComponent } from './components/admin/modal-corte-convenio/modal-corte-convenio.component';
import { ModalUpdateRestaurantComponent } from './components/admin/modal-update-restaurant/modal-update-restaurant.component';
import { ModalUpdateRepartidorComponent } from './components/admin/modal-update-repartidor/modal-update-repartidor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular-Material
import { DemoMaterialModule } from './material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

// Impartación del lenguaje español de los locales
import es from '@angular/common/locales/es';
// Registro del local de el lenguje español
registerLocaleData(es);





@NgModule({
  declarations: [
    AppComponent,
    ListSucursalesComponent,
    DeatailsSucursalComponent,
    HeroComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    Page404Component,
    RegisterComponent,
    FilterSucursalPipe,
    HomeAdminComponent,
    ListRepartidoresComponent,
    ModalRepartidorComponent,
    FilterRepartidorPipe,
    ListAdministradoresComponent,
    ModalAdministradorComponent,
    FilterRestaurantePipe,
    FilterAdministradorPipe,
    ListClientesComponent,
    ClienteFilterPipe,
    ListTransporteComponent,
    ModalTransporteComponent,
    TransportePipe,
    ListMenusComponent,
    ModalMenuComponent,
    ListRestaurantesComponent,
    ModalRestauranteComponent,
    NgDropFilesDirective,
    ModalRComponent,
    FilterMenuPipe,
    ListServiciosComponent,
    DetallePedidoComponent,
    FilterServiciosDiaPipe,
    ListHostorialServiciosComponent,
    ServiciohUsuarioPipe,
    ServiciohRepartidorPipe,
    ListCorteComponent,
    ListDetailServiciosComponent,
    ListPedidosComponent,
    PedidoPipe,
    DetailPedidosConvenioComponent,
    ListHistorialPedidosConveniosComponent,
    ConfigServicioComponent,
    ConfigBannerComponent,
    ListCategoryConvenioComponent,
    ModalCategoryConvenioComponent,
    ModalCorteConvenioComponent,
    ModalUpdateRestaurantComponent,
    ModalUpdateRepartidorComponent,
    CortesConvenioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxPaginationModule,
    CsvModule,
    NgxPrintModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCBWTmCjb-1_zDsl-yjBwl3EqCnVA_SEto',
      language: 'es',
      libraries: ['geometry', 'places']
    }),
    AgmDirectionModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right' }),
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'MXN'},
    {provide: LOCALE_ID, useValue: 'es-mx'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    AngularFireAuth,
    AngularFirestore],
    bootstrap: [AppComponent]
})
export class AppModule {}
