import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clienteFilter'
})
export class ClienteFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
        // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const cliente of value) {
      if (cliente.username.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultPosts.push(cliente);
    }
    }
    return resultPosts;
  }

}
