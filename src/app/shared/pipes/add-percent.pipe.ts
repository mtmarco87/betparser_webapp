import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'add_percent'
})
export class AddPercentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value || value === 'N/A'){
      return value;
    }
    
    return value + '%';
  }
}
