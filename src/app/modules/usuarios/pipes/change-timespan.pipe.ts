import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeTimespan'
})
export class ChangeTimespanPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    console.log(value);
    let date = new Date(value.seconds * 1000).toLocaleDateString();
    return date;
  }

}
