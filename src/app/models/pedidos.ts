import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Servicios {
   clave?: number;
   estatus?: string;
   motivo?: string;
   calificacionRepartidor?: any;
   comentarioRepartidor?: string;
   fecha?: Timestamp<null>;
   entrega?: string;
   tipo?: number;
   tipoTransporte?: string;
   uidCliente?: string;
   uidRepartidor?: string;
   uidRestaurante?: string;
   metodo_pago?: string;
   tiempoServicio?: string;
   costoProducto?: string;
   costoServicio?: number;
   comisionServicio?: number;
   costoTotal?: number;
   uid?: string;
   entregaGeo?: any;
   partidaGeo?: any;
   entregaDir?: string;
   totalNeto?: any;
   corteRep?: number;
   corteBme?: number;
   totalServicio?: any;
   comision?: number;
   totalProductos?: number;
   // Convenio
   descripcion?: null;
   cliente?: string;
   notas?: null;
   tel?: string;
   abierto?: string;
   km?: any;
   numPedidos?: number;
}
export interface Pedidos {
    uid?: string;
    pedido?: string;
    total?: number;
    ticket?: string;
    direccionLocal?: string;
    nombreLocal?: string;
    servicioID?: string;
    pedidoGeo?: any;
    totalNeto?: any;

}

export interface Productos {
    uid?: string;
    cantidad?: number;
    descripcion?: string;
    costo?: number;
    productoID?: string;
    producto?: string;

}
