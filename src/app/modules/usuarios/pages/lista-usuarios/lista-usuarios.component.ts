import { Component, OnInit,Input, OnDestroy, IterableDiffers } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {

  
  public isEspecialista:boolean;
  public seEjecutoOnInit = false;
  public listIds:Array<String> ;
  public listaUsuarios:Array<Especialistas | Pacientes>;

  constructor(
    public route:ActivatedRoute,
    public ingresoService:IngresoService
  ) { 
    this.route.params.subscribe((params:Params) => {
      this.isEspecialista = params.isEspecialista == 'true' ? true : false;
      if(this.seEjecutoOnInit){
        this.ngOnInit();
      }
     
    });
    
  }

  changeEstado(usuario,isEnabled){
    usuario.enabled = isEnabled;
  }
  
  ngOnInit(): void {
    this.seEjecutoOnInit = true;
    this.listIds = new Array<String>();
    this.listaUsuarios = new Array<Especialistas | Pacientes>();
    if(this.isEspecialista){
     
      this.ingresoService.getAllEspecialistas().snapshotChanges().pipe(  
        map(data =>{
         
          data.map(esp => {
            this.listIds.push(esp.payload.doc.id);
            this.listaUsuarios.push(esp.payload.doc.data());
          })
        })
      ).subscribe();
    }else{
      this.ingresoService.getAllPacientes().snapshotChanges().pipe(  
        map(data =>{
          data.map(esp => {
            this.listIds.push(esp.payload.doc.id);
            this.listaUsuarios.push(esp.payload.doc.data());
          })
        })
      ).subscribe();
    }
  }

  ngOnDestroy(){
    for(let i = 0 ; i < this.listaUsuarios.length ; i++){
      if('especialidad' in this.listaUsuarios[i]){
        console.log(this.listaUsuarios[i]);
        this.ingresoService.updateEspecialista(this.listIds[i],{enabled:(<Especialistas>this.listaUsuarios[i]).enabled});
      }
    }
  }

}
