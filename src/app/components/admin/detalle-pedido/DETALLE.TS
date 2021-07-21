<section>
    <div class="jumbotron">
        <div class="card border-primary mb-3" style="max-width: 85rem;">
            <div class="card-header">
                <div style="text-align: left;">
                    Servicio: <small class="text-muted ">{{ pedido.clave }} </small>
                </div>
                <div style="text-align: right;">
                    <span>Fecha / hora: {{ pedido.fecha.toDate() | date: 'MM-dd-yyyy HH:mm:ss' }} </span>
                </div>
            </div>

            <div class="card-body">
                <h4 class="card-title">Nombre del cliente</h4>
                <div class="esq1">
                    <div class="progress esq3 mr-5">
                        <div *ngIf="pedido.estatus == 'Notificando'" class="progress-bar badge-pill badge-success" role="progressbar" style="width: 12.5%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Notificando(12%) </div>

                        <div *ngIf="pedido.estatus == 'Aceptado'" class="progress-bar badge-pill bg-success" role="progressbar" style="width: 25%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Aceptado(25%)</div>

                        <div *ngIf="pedido.estatus == 'Buscando'" class="progress-bar badge-pill bg-success" role="progressbar" style="width: 25%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Buscando Repartidor(25%)</div>

                        <div *ngIf="pedido.estatus == 'Llendo'" class="progress-bar badge-pill bg-info" role="progressbar" style="width: 37.5%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">LLendo al destino(37%) </div>

                        <div *ngIf="pedido.estatus == 'Comprando'" class="progress-bar badge-pill bg-primary" role="progressbar" style="width: 50%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Comprando(50%) </div>

                        <div *ngIf="pedido.estatus == 'Comprado'" class="progress-bar bg-success" role="progressbar" style="width: 62.5%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Comprado(62%) </div>

                        <div *ngIf="pedido.estatus == 'Preparando'" class="progress-bar badge-pill bg-info" role="progressbar" style="width: 62.5%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Preparando(62%) </div>

                        <div *ngIf="pedido.estatus == 'Llenvandolo'" class="progress-bar badge-pill bg-primary" role="progressbar" style="width: 75%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Llevandolo(75%) </div>

                        <div *ngIf="pedido.estatus == 'EnPuerta'" class="progress-bar bg-success" role="progressbar" style="width: 87.5%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Esta en puerta(87%) </div>

                        <div *ngIf="pedido.estatus == 'Enviando'" class="progress-bar bg-success" role="progressbar" style="width: 87.5%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Enviando(87%) </div>

                        <div *ngIf="pedido.estatus == 'Pagado'" class="progress-bar badge-pill bg-success" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Pagado(100%) </div>

                        <div *ngIf="pedido.estatus == 'Cancelado'" class="progress-bar badge-pill bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Cancelado</div>
                    </div>

                    <br>
                    <!-- <span *ngIf="pedido.estatus == 'Notificando'" class="badge badge-pill badge-info">Notificando</span>
                    <span *ngIf="pedido.estatus == 'Aceptado'" class="badge badge-pill badge-success">Aceptado</span>
                    <span *ngIf="pedido.estatus == 'Llendo'" class="badge badge-pill badge-primary">Llendo al destino</span>
                    <span *ngIf="pedido.estatus == 'Comprando'" class="badge badge-pill badge-primary">Comprando</span>
                    <span *ngIf="pedido.estatus == 'Comprado'" class="badge badge-pill badge-primary">Comprado</span>
                    <span *ngIf="pedido.estatus == 'Llenvandolo'" class="badge badge-pill badge-primary">Llenvandolo</span>
                    <span *ngIf="pedido.estatus == 'Puerta'" class="badge badge-pill  badge-primary">Esta en puerta</span>
                    <span *ngIf="pedido.estatus == 'Pagado'" class="badge badge-pill badge-success">Pagado</span>
                    <span *ngIf="pedido.estatus == 'Cancelado'" class="badge badge-pill badge-danger">Cancelado</span> -->
                    <!-- Restaurante estados -->
                    <!-- <span *ngIf="pedido.estatus == 'Preparando'" class="badge badge-pill badge-info">Preparando</span>
                    <span *ngIf="pedido.estatus == 'Buscando'" class="badge badge-pill badge-info">Buscando BMe</span>
                    <span *ngIf="pedido.estatus == 'Enviando'" class="badge badge-pill badge-info">Enviando</span> -->
                    <br>
                    <img *ngIf="pedido.tipo == 1" class="log" src="../../../../assets/imgs/log.png" alt="BringMe Docs.">
                    <img *ngIf="pedido.tipo == 2" class="log" src="../../../../assets/imgs/log2.png" alt="BringMe Docs.">
                </div>
                <div class="esq ml-2">
                    <button type="button" class="btn btn-outline-primary" title="Imprimir"><i class="fa fa-print" aria-hidden="true"></i></button>
                </div>
            </div>
            <div class="row pad-10">
                <div class="col-4 ml-4 mb-2">
                    <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-male"></i> Información del cliente</h6>
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Uid:</b> <small> {{ pedido.uid }} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Nombre:</b> <small> {{ pedido.uid }} </small></a>
                    </div>
                </div>
                <div class="col-4 prd">
                    <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-cutlery"></i> Información del producto</h6>
                    <div class="list-group">
                        <ng-container *ngIf="pedido.tipo == 2">
                            <ng-container *ngFor="let pedido of pedido.productos">
                                <a href="#" class="list-group-item list-group-item-action disabled">
                                    <b>Estado del pedido: </b> <small> {{ pedido.productos.uid_menu }} </small></a>
                                <a href="#" class="list-group-item list-group-item-action disabled">
                                    <b>Descripción: </b> <small> {{ pedido.productos.descripcion }} </small></a>
                                <a href="#" class="list-group-item list-group-item-action disabled">
                                    <b>Cantidad: </b> <small> {{ pedido.productos.descripcion }} </small></a>
                                <a href="#" class="list-group-item list-group-item-action disabled">
                                    <b>Costo: </b> <small> {{ pedido.productos.descripcion }} </small></a>   
                            </ng-container>
                        </ng-container>
                        <ng-container *ngIf="pedido.tipo == 1">
                            <ng-container>
                             <a href="#" class="list-group-item list-group-item-action disabled">
                                <b>Cantidad: </b> <small> {{ pedido.productos.descripcion }} </small></a>
                            </ng-container> 
                        </ng-container>
                        
                    </div>
                </div>
                <div class="col-4 mr-2 mb-2 prd2">
                    <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-paper-plane-o
                      "></i> Información del servcio</h6>
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Tipo de servicio: </b> <small> {{ pedido.tipo == 1 ? 'Pide lo que quieras': 'Convenio' }} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Estado del pedido: </b> <small> {{ pedido.estatus }} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Uid Repartidor: </b> <small> {{ pedido.uid_repartidor }} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Nombre Repartidor: </b> <small> {{ pedido.uid_repartidor }} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Tipo de transporte: </b><small> {{ pedido.tipo_transporte }} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b> Dirección de entrega: </b> <small> </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Dirección de compra: </b> <small></small></a>
                        <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-usd
                                "></i> Costos</h6>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Metodo de pago: </b> <small>{{pedido.totales.metodo_pago}} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Tiempo de servicio: </b> <small>{{pedido.totales.tiempo_servicio}} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Total producto: </b> <small>{{pedido.totales.total_producto}} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Comisión: </b> <small>{{pedido.totales.comision}} </small></a>
                        <a href="#" class="list-group-item list-group-item-action disabled">
                            <b>Total servicio: </b> <small>{{pedido.totales.total_servicio}} </small></a>
                        <a href="#" class="list-group-item list-group-item-action">
                            <b>Ticket: </b> <small> {{ pedido.totales.ticket }} </small></a>
                    </div>
                </div>
            </div>
        </div>
        <hr class="my-4 ">

    </div>
</section>
// Otra seccion 
<section>

    <div class="jumbotron" id="print-section">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#home">Detalle</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#profile">Tracking</a>
            </li>
        </ul>
        <div id="myTabContent" class="tab-content">
            <div class="tab-pane fade active show" id="home">
                <div class="card border-primary mb-3" style="max-width: 85rem;">
                    <div class="card-header">
                        <div style="text-align: left;">
                            Clave del Servicio: <small class="text-muted ">{{ servicio.clave }} </small>
                        </div>
                        <div style="text-align: right;">
                            <span>Fecha / hora: {{ servicio.fecha.toDate() | date: 'MM-dd-yyyy HH:mm:ss' }} </span>
                        </div>
                    </div>
                    <div class="card-body">
                        <ng-container *ngFor="let usuario of usuarios">
                            <ng-container *ngIf="usuario.uid == servicio.uidCliente">
                                <!-- <img [src]="usuario.photourl" alt=""> -->
                                <h4 class="card-title"><b>Nombre del cliente: </b> <small>{{ usuario.username }} {{usuario.lastname}} </small></h4><br>
                                <p>UID del servicio: {{ servicio.uid }} </p>
                            </ng-container>
                        </ng-container>
                        <div class="esq1">

                            <div class="progress esq3 mr-5">
                                <div *ngIf="servicio.estatus == 'Notificando'" class="progress-bar badge-pill badge-success" role="progressbar" style="width: 12.5%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Notificando(12%) </div>

                                <div *ngIf="servicio.estatus == 'Aceptado'" class="progress-bar badge-pill bg-success" role="progressbar" style="width: 25%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Aceptado(25%)</div>

                                <div *ngIf="servicio.estatus == 'Buscando'" class="progress-bar badge-pill bg-success" role="progressbar" style="width: 25%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Buscando Repartidor(25%)</div>

                                <div *ngIf="servicio.estatus == 'Llendo'" class="progress-bar badge-pill bg-info" role="progressbar" style="width: 37.5%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">LLendo al destino(37%) </div>

                                <div *ngIf="servicio.estatus == 'Comprando'" class="progress-bar badge-pill bg-primary" role="progressbar" style="width: 50%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Comprando(50%) </div>

                                <div *ngIf="servicio.estatus == 'Comprado'" class="progress-bar bg-success" role="progressbar" style="width: 62.5%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Comprado(62%) </div>

                                <div *ngIf="servicio.estatus == 'Preparando'" class="progress-bar badge-pill bg-info" role="progressbar" style="width: 62.5%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Preparando(62%) </div>

                                <div *ngIf="servicio.estatus == 'Llenvandolo'" class="progress-bar badge-pill bg-primary" role="progressbar" style="width: 75%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Llevandolo(75%) </div>

                                <div *ngIf="servicio.estatus == 'EnPuerta'" class="progress-bar bg-success" role="progressbar" style="width: 87.5%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Esta en puerta(87%) </div>

                                <div *ngIf="servicio.estatus == 'Enviando'" class="progress-bar bg-success" role="progressbar" style="width: 87.5%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Enviando(87%) </div>

                                <div *ngIf="servicio.estatus == 'Pagado'" class="progress-bar badge-pill bg-success" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Pagado(100%) </div>

                                <div *ngIf="servicio.estatus == 'Cancelado'" class="progress-bar badge-pill bg-danger" role="progressbar" style="width: 100%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Cancelado</div>
                            </div>

                            <br>
                            <!-- <span *ngIf="pedido.estatus == 'Notificando'" class="badge badge-pill badge-info">Notificando</span>
                                            <span *ngIf="pedido.estatus == 'Aceptado'" class="badge badge-pill badge-success">Aceptado</span>
                                            <span *ngIf="pedido.estatus == 'Llendo'" class="badge badge-pill badge-primary">Llendo al destino</span>
                                            <span *ngIf="pedido.estatus == 'Comprando'" class="badge badge-pill badge-primary">Comprando</span>
                                            <span *ngIf="pedido.estatus == 'Comprado'" class="badge badge-pill badge-primary">Comprado</span>
                                            <span *ngIf="pedido.estatus == 'Llenvandolo'" class="badge badge-pill badge-primary">Llenvandolo</span>
                                            <span *ngIf="pedido.estatus == 'Puerta'" class="badge badge-pill  badge-primary">Esta en puerta</span>
                                            <span *ngIf="pedido.estatus == 'Pagado'" class="badge badge-pill badge-success">Pagado</span>
                                            <span *ngIf="pedido.estatus == 'Cancelado'" class="badge badge-pill badge-danger">Cancelado</span> -->
                            <!-- Restaurante estados -->
                            <!-- <span *ngIf="pedido.estatus == 'Preparando'" class="badge badge-pill badge-info">Preparando</span>
                                            <span *ngIf="pedido.estatus == 'Buscando'" class="badge badge-pill badge-info">Buscando BMe</span>
                                            <span *ngIf="pedido.estatus == 'Enviando'" class="badge badge-pill badge-info">Enviando</span> -->
                            <br>
                            <img *ngIf="servicio.tipo == 1" class="log" src="../../../../assets/imgs/log.png" alt="BringMe Docs.">
                            <img *ngIf="servicio.tipo == 2" class="log" src="../../../../assets/imgs/log2.png" alt="BringMe Docs.">
                        </div>
                        <div class="esq ml-2">
                            <button type="button" class="btn btn-outline-primary" title="Imprimir" printSectionId="print-section" ngxPrint><i class="fa fa-print" aria-hidden="true"></i></button>
                        </div>

                    </div>
                    <div class="row pad-10">
                        <div class="col-4 ml-4 mb-2">
                            <ul class="list-group">
                                <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-male"></i> Información del Cliente</h6>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Uid Cliente:
                                    <span class="badge badge-primary badge-pill">{{ servicio.uidCliente }}</span>
                                </li>
                                <ng-container *ngFor="let usuario of usuarios">
                                    <li *ngIf="usuario.uid == servicio.uidCliente" class="list-group-item d-flex justify-content-between align-items-center">
                                        Nombre:
                                        <span class="badge badge-primary badge-pill">{{ usuario.username }} {{usuario.lastname}}</span>
                                    </li>
                                    <li *ngIf="usuario.uid == servicio.uidCliente" class="list-group-item d-flex justify-content-between align-items-center">
                                        Email:
                                        <span class="badge badge-primary badge-pill">{{ usuario.email }}</span>
                                    </li>
                                    <li *ngIf="usuario.uid == servicio.uidCliente" class="list-group-item d-flex justify-content-between align-items-center">
                                        Teléfono:
                                        <span class="badge badge-primary badge-pill">{{ usuario.phone }}</span>
                                    </li>
                                </ng-container>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Dir. de entrega:
                                    <a style="font-size: 10px;" href="{{'https://maps.google.com/?q='+ servicio.entregaGeo._lat +','+ servicio.entregaGeo._long }}" target="_blank"> <span class=""><b>{{ servicio.entregaDir }} </b></span></a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-4 prd">
                            <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-cutlery"></i> Información del producto</h6>
                            <div class="list-group">
                                <ul class="list-group">
                                    <ng-container *ngIf="servicio.tipo == 2">
                                        <ng-container *ngFor="let producto of productos; index as i">
                                            <li style="list-style:none">
                                                <h6 class="list-group-item list-group-item-action active">Producto {{ i + 1 }} </h6>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Cantidad:
                                                <span class="badge badge-primary badge-pill">{{ producto.cantidad }}</span>
                                            </li>
                                            <ng-container *ngFor="let menu of menus">
                                                <ng-container *ngIf="producto.uid_menu == menu.uid">
                                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                                        Producto
                                                        <span class="badge badge-primary badge-pill">{{ menu.nombre }} </span>
                                                    </li>
                                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                                        Descripción:
                                                        <span class="badge badge-primary badge-pill">{{ menu.descripcion }} </span>
                                                    </li>
                                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                                        Precio:
                                                        <span class="badge badge-primary badge-pill">{{ menu.precio }}</span>
                                                    </li>
                                                </ng-container>
                                            </ng-container>
                                        </ng-container>
                                    </ng-container>
                                </ul>
                                <ng-container *ngIf="servicio.tipo == 1">
                                    <ng-container *ngFor="let producto of productos; index as i">
                                        <ul class="list-group">
                                            <li style="list-style:none">
                                                <h6 class="list-group-item list-group-item-action active">Encargos del Pedido: {{ i + 1 }} </h6>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Cantidad:
                                                <span class="badge badge-primary badge-pill">{{ producto.cantidad }}</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Descripción:
                                                <span class="badge badge-primary badge-pill">{{ producto.descripcion }}</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Precio:
                                                <span class="badge badge-primary badge-pill">${{ producto.costo }}</span>
                                            </li>
                                        </ul>
                                    </ng-container>
                                </ng-container>
                            </div>
                        </div>
                        <div class="col-4 mr-2 mb-2 prd2">
                            <ul class="list-group">
                                <li style="list-style:none">
                                    <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-paper-plane-o
                                                            "></i> Información del servicio</h6>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Tipo de servicio:
                                    <span class="badge badge-primary badge-pill">{{ servicio.tipo == 1 ? 'Pide lo que quieras': 'Convenio' }}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Estado del pedido:
                                    <span class="badge badge-primary badge-pill">{{ servicio.estatus }}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Uid Repartidor:
                                    <span class="badge badge-primary badge-pill">{{ servicio.uidRepartidor }} </span>
                                </li>
                                <ng-container *ngFor="let usuario of usuarios">
                                    <ng-container *ngIf="usuario.uid == servicio.uidRepartidor">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Nombre Repartidor:
                                            <span class="badge badge-primary badge-pill">{{ usuario.username }} {{ usuario.lastname }}  </span>
                                        </li>
                                    </ng-container>
                                </ng-container>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Tipo de transporte:
                                    <span class="badge badge-primary badge-pill">{{ servicio.tipoTransporte }} </span>
                                </li>
                                <ng-container *ngFor="let pedido of pedidos; index as i">
                                    <ng-container *ngIf="servicio.tipo == 1">
                                        <li style="list-style:none">
                                            <h6 class="list-group-item list-group-item-action active">Dirección del Pedido: {{ i + 1 }} </h6>
                                        </li>
                                        <ng-container *ngIf="servicio.uid == pedido.servicioID">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Dir. de compra:
                                                <a style="font-size: 10px;" href="{{'https://maps.google.com/?q='+ pedido.pedidoGeo._lat +','+ pedido.pedidoGeo._long }}" target="_blank"> <span class=""><b>{{ pedido.direccionLocal }} </b></span></a>
                                            </li>

                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Nombre de local:
                                                <span class="badge badge-primary badge-pill">{{ pedido.nombreLocal }} </span>
                                            </li>
                                        </ng-container>
                                    </ng-container>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Ticket:
                                        <span class="badge badge-primary badge-pill"> {{ pedido.ticket == null ? 'Aún no se a subido una imagen': ''}} </span>
                                    </li>
                                </ng-container>
                                <ng-container *ngIf="servicio.tipo == 2">
                                    <li style="list-style:none;">
                                        <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-cutlery
                                                                    "></i> Dondé se compra</h6>
                                    </li>
                                    <ng-container *ngFor="let usuario of usuarios">
                                        <ng-container *ngIf="usuario.uid == servicio.uidRestaurante">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Nombre Restaurante:
                                                <span class="badge badge-primary badge-pill"> {{ usuario.username }} </span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Contacto:
                                                <span class="badge badge-primary badge-pill"> {{ usuario.contacto }} </span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Dirección:
                                                <span class="badge badge-primary badge-pill"> {{ usuario.address }} </span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Teléfono:
                                                <span class="badge badge-primary badge-pill"> {{ usuario.phone }} </span>
                                            </li>
                                        </ng-container>
                                    </ng-container>
                                </ng-container>
                                <li style="list-style:none;">
                                    <h6 class="list-group-item list-group-item-action active"> <i class="fa fa-usd
                                                                    "></i> Costos</h6>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Metodo de pago:
                                    <span class="badge badge-primary badge-pill">{{servicio.metodo_pago}}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Tiempo de servicio:
                                    <span class="badge badge-primary badge-pill">{{servicio.tiempoServicio}}</span>
                                </li>
                                <!-- esta parte es la suma de los productos 
                                                                 <li class="list-group-item d-flex justify-content-between align-items-center">
                                                                    Total producto:
                                                                    <span class="badge badge-primary badge-pill">{{servicio.total_producto}}</span>
                                                                 </li>
                                                                </li> -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Costo Servicio:
                                    <span class="badge badge-primary badge-pill">${{servicio.costoServicio}}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Comisión:
                                    <span class="badge badge-primary badge-pill">${{servicio.comisionServicio}}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Total servicio:
                                    <span class="badge badge-primary badge-pill">${{servicio.costoTotal}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style="margin-top: -17em;" class="col-8">
                        <div id="map"></div>
                    </div>
                </div>
                <hr class="my-4 ">
            </div>
            <div class="tab-pane fade" id="profile">
                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth
                    letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
            </div>
        </div>
    </div>
</section>