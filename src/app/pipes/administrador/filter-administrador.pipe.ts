import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAdministrador'
})
export class FilterAdministradorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
      const resultPosts = [];
      for (const administrador of value) {
        if (administrador.username.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
          resultPosts.push(administrador);
      }
      }
      return resultPosts;
    }
  }


