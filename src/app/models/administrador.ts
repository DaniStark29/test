export interface Roles {
    administrador?: boolean;
}
// export interface Perfil {
//     username?: string;
//     email?: string;
//     password?: string;
//     lastname?: string;
//     phone?: string;
//     address?: string;
//     activo?: boolean;
//     photoUrl?: string;
// }

export interface UserInterface {
    // perfil: Perfil;
    username?: string;
    email?: string;
    password?: string;
    lastname?: string;
    phone?: string;
    address?: string;
    activo?: boolean;
    photoUrl?: string;
    tipo?: string;
    uid?: string;
    providerId?: string;
    roles: Roles;
}
