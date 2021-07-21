import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviciohRepartidor'
})
export class ServiciohRepartidorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
      const resultPosts = [];
      for (const repartidor of value) {
        if (repartidor.username.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
          resultPosts.push(repartidor);
      }
      }
      return resultPosts;
    }


}
