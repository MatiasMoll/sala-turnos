import { Pipe, PipeTransform } from '@angular/core';
import { parse } from 'path';

@Pipe({
  name: 'changeFormatDate'
})
export class ChangeFormatDatePipe implements PipeTransform {

  private mapDiaDelMes:Map<number,string> = new Map<number,string>([
    [1,'Enero'],
    [2,'Febrero'],
    [3,'Marzo'],
    [4,'Abril'],
    [5,'Mayo'],
    [6,'Junio'],
    [7,'Julio'],
    [8,'Agosto'],
    [9,'Septiembre'],
    [10,'Octubre'],
    [11,'Noviembre'],
    [12,'Diciembre']
  ]);

  transform(value: any, ...args: any[]): unknown {
    let arrayFecha = value.split(' ');
    let arrayDiaMes = arrayFecha[0].split('/');
    return arrayDiaMes[0] + ' de ' + this.mapDiaDelMes.get(parseInt(arrayDiaMes[1])) + ' '+arrayFecha[1];

  }

}
