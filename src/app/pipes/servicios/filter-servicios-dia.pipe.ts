import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterServiciosDia'
})
export class FilterServiciosDiaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
      const resultPosts = [];
      for (const pedido of value) {
        if (pedido.clave.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
          resultPosts.push(pedido);
      }
      }
      return resultPosts;
    }

}
