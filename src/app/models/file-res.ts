export class Roles {
    public restaurante?: boolean;
}
export class FileRes {
    public uid?: string;
    public archivo: File;
    public nombreArchivo: string;
    public photourl: string;
    public estaSubiendo: boolean;
    public progreso: number;
    public email?: string;
    public password?: string;
    public activo?: boolean;
    public tipo?: number;
    public username?: string;
    public contacto?: string;
    public address?: string;
    public phone?: string;
    roles: Roles;

    constructor( archivo: File) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;

        this.estaSubiendo = false;
        this.progreso = 0;
    }
}
