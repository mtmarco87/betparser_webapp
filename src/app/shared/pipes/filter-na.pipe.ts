import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter_na'
})
export class FilterNaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      value = "N/A";
    }
    return value;
  }
}
