import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'filterRestaurante'
})
export class FilterRestaurantePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
      const resultPosts = [];
      for (const restaurante of value) {
        if (restaurante.username.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
          resultPosts.push(restaurante);
      }
      }
      return resultPosts;
    }

}
