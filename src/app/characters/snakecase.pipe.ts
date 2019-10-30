import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakecase'
})
export class SnakecasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/ /g, '_').toLowerCase();
  }

}
