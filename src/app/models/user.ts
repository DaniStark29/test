export interface Roles {
    // editor?: boolean;
    // admin?: boolean;
    restaurante?: boolean;
    administrador?: boolean;
    repartidor?: boolean;
}
export interface Geo {
  _lat?: any;
  _long?: any;
}
// export interface Perfil {
//     username?: string;
//     lastname?: string;
//     email?: string;
//     password?: string;
//     contacto?: string;
//     phone?: string;
//     address?: string;
//     activo?: boolean;
//     photoUrl?: string;
// }

export interface UserInterface {
  direccion?: any;
  // perfil: Perfil;
  username?: string;
  lastname?: string;
  email?: string;
  password?: string;
  contacto?: string;
  phone?: string;
  marca?: string;
  placa?: string;
  uidCategoria?: string;
  hora_abierto?: string;
  hora_cerrar?: string;
  address?: string;
  activo?: boolean;
  photourl?: string;
  tipo?: number;
  uid?: string;
  providerId?: string;
  roles: Roles;
  pago?: string;
  geolocalizacion?: Geo;
  uidSucursal?: string;
}
