import { Pipe, PipeTransform } from '@angular/core';
import { IngresoService } from '../services/ingreso/ingreso.service';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, ...arg: any): unknown {
    const resultPosts = [];
    var shouldPush = false;
   
    if(arg !== undefined){
      for(const post of value){
        let objeto = JSON.parse(JSON.stringify(post));
        let keys = Object.keys(objeto);
        for(let y of keys){

          if(typeof objeto[y] == 'object'){
           let innerObject = JSON.parse(JSON.stringify(objeto[y]));
           let innerKey = Object.keys(innerObject);
           
           for(let x of innerKey){
              let stringCampo = String(innerObject[x]);
              if(stringCampo.indexOf(arg) > -1 && stringCampo !== undefined){
                console.log('campoObj ' + x);
                console.log('campo ' + stringCampo);
                console.log('campoObj previo ' + y);
                shouldPush = true;
              }
            }
          }else if(objeto[y] !== '' && objeto[y] !== null && objeto[y] !== undefined && y != 'idDocumento'){
          if(objeto[y].indexOf(arg) > -1){
            console.log('turnoObj ' + y);
            console.log('turno ' + objeto[y]);
            shouldPush = true;
          }
         }       
        }
        if(shouldPush){
          resultPosts.push(post);
        }
      };
    }
    console.log(resultPosts);
    return resultPosts;
  }

}
