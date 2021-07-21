import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../service/data-api.service';
import { SucursalInterface } from '../../../models/sucursal';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-deatails-sucursal',
  templateUrl: './deatails-sucursal.component.html',
  styleUrls: ['./deatails-sucursal.component.css']
})
export class DeatailsSucursalComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute ) { }
  public sucursal: SucursalInterface = {};

  ngOnInit() {
    const idSucursal = this.route.snapshot.params['id'];
    this.getDetails(idSucursal);

  }
  getDetails(idSucursal: string): void {
    this.dataApi.getOneSucursal(idSucursal).subscribe(sucursal => {
     this.sucursal = sucursal;
    });
  }
}
