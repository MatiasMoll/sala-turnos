import { Pipe, PipeTransform } from '@angular/core';
import { IngresoService } from '../services/ingreso/ingreso.service';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  private isEspecialista:boolean;
  constructor(
    private ingresoServices:IngresoService
  ){
    this.isEspecialista = this.ingresoServices.especialistaLogeado != null;
  }
  transform(value: any, ...arg: any): unknown {
    const resultPosts = [];
    if(arg != undefined){
      for(const post of value){
        console.log(post);
        console.log('la concha de tu madre ' + arg);
        if(this.isEspecialista){
          if(post.paciente.apellido.indexOf(arg) > -1 || post.especialidad.indexOf(arg) > -1){
            resultPosts.push(post);
          };
        }else{
          if(post.medico.apellido.indexOf(arg) > -1 || post.especialidad.indexOf(arg) > -1){
            resultPosts.push(post);
          };
        }
  
      };
    }
    
    return resultPosts;
  }

}
