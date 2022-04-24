import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encode'
})
export class EncodePipe implements PipeTransform {

  transform(value: string, param: string): string {
    if (param == "URI")
      return window.encodeURI(value);
    else
      return value;
  }

}
