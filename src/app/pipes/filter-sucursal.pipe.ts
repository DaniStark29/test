import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSucursal'
})
export class FilterSucursalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
  // tslint:disable-next-line:curly
  if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const sucursal of value) {
      if (sucursal.estado.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultPosts.push(sucursal);
    }
    }
    return resultPosts;
  }

}
