export class Roles {
    restaurante?: boolean;
}
// export interface Perfil {
//     username?: string;
//     email?: string;
//     password?: string;
//     contacto?: string;
//     phone?: string;
//     address?: string;
//     activo?: boolean;
//     photoUrl?: string;
// }

export interface UserInterfaceRes {
   // perfil: Perfil;
   username?: string;
    email?: string;
    password?: string;
    contacto?: string;
    phone?: string;
    address?: string;
    activo?: boolean;
    photoUrl?: string;
    tipo?: string;
    uid?: string;
    providerId?: string;

    roles: Roles;

}
