import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMenu'
})
export class FilterMenuPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
   if (arg === '' || arg.length < 3) return value;
   const resultPosts = [];
   for (const menu of value) {
     if (menu.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
       resultPosts.push(menu);
   }
   }
   return resultPosts;
 }

}
