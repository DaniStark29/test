import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviciohUsuario'
})
export class ServiciohUsuarioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
      const resultPosts = [];
      for (const usuario of value) {
        if (usuario.username.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
          resultPosts.push(usuario);
      }
      }
      return resultPosts;
    }
}
