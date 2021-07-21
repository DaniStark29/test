import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DeatailsSucursalComponent } from './components/admin/deatails-sucursal/deatails-sucursal.component';
import { ListSucursalesComponent } from './components/admin/list-sucursales/list-sucursales.component';
import { LoginComponent } from './components/users/login/login.component';
// import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { ListRepartidoresComponent } from './components/admin/list-repartidores/list-repartidores.component';
import { ListAdministradoresComponent } from './components/admin/list-administradores/list-administradores.component';
import { ListClientesComponent } from './components/admin/list-clientes/list-clientes.component';
import { ListTransporteComponent } from './components/admin/list-transporte/list-transporte.component';
import { ListMenusComponent } from './components/restaurante/list-menus/list-menus.component';
import { ListRestaurantesComponent } from './components/admin/list-restaurantes/list-restaurantes.component';
import { ListServiciosComponent } from './components/admin/list-servicios/list-servicios.component';
import { DetallePedidoComponent } from './components/admin/detalle-pedido/detalle-pedido.component';
import { ListHostorialServiciosComponent } from './components/admin/list-hostorial-servicios/list-hostorial-servicios.component';
import { ListCorteComponent } from './components/admin/list-corte/list-corte.component';
import { ListDetailServiciosComponent } from './components/admin/list-detail-servicios/list-detail-servicios.component';
import { ListPedidosComponent } from './components/restaurante/list-pedidos/list-pedidos.component';
import { DetailPedidosConvenioComponent } from './components/restaurante/detail-pedidos-convenio/detail-pedidos-convenio.component';
// tslint:disable-next-line: max-line-length
import { ListHistorialPedidosConveniosComponent } from './components/restaurante/list-historial-pedidos-convenios/list-historial-pedidos-convenios.component';
import { ConfigServicioComponent } from './components/admin/config-servicio/config-servicio.component';
import { ConfigBannerComponent } from './components/admin/config-banner/config-banner.component';
import { ListCategoryConvenioComponent } from './components/admin/list-category-convenio/list-category-convenio.component';
import { ModalUpdateRestaurantComponent } from './components/admin/modal-update-restaurant/modal-update-restaurant.component';
import { ModalUpdateRepartidorComponent } from './components/admin/modal-update-repartidor/modal-update-repartidor.component';
import { CortesConvenioComponent } from './components/restaurante/cortes-convenio/cortes-convenio.component';
import { Route } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/login', component: LoginComponent },
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/home-admin',
    component: HomeAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-cortes',
    component: ListCorteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sucursal/:id',
    component: DeatailsSucursalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-sucursal',
    component: ListSucursalesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-repartidores',
    component: ListRepartidoresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-administradores',
    component: ListAdministradoresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-historial-servicios',
    component: ListHostorialServiciosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'convenio/list-historial-servicios',
    component: ListHistorialPedidosConveniosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'servicio-convenio/:uid',
    component: DetailPedidosConvenioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/convenio-categoria',
    component: ListCategoryConvenioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurante/restaurante-list-menu',
    component: ListMenusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-restaurantes',
    component: ListRestaurantesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-servicios/:uid',
    component: ListDetailServiciosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-transportes',
    component: ListTransporteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/config-servicio',
    component: ConfigServicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/config-banner',
    component: ConfigBannerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-servicios',
    component: ListServiciosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-pedidos-res',
    component: ListPedidosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/list-clientes',
    component: ListClientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'servicio/:uid',
    component: DetallePedidoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updateRest/:uid',
    component: ModalUpdateRestaurantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updateRepa/:uid',
    component: ModalUpdateRepartidorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurante/cortes-convenio',
    component: CortesConvenioComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', component: Page404Component }
  // { path: 'user/register', component: RegisterComponent, canActivate: [AuthGuard]  },
  // RESTAURANTES
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(routes);
