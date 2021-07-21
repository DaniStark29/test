import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transporte'
})
export class TransportePipe implements PipeTransform {

  transform(value: any, arg: any): any {
   // tslint:disable-next-line:curly
  if (arg === '' || arg.length < 3) return value;
  const resultPosts = [];
  for (const transporte of value) {
    if (transporte.placa.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
      resultPosts.push(transporte);
  }
  }
  return resultPosts;
}

}
