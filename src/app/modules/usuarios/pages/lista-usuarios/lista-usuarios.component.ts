import { Component, OnInit,Input } from '@angular/core';
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
export class ListaUsuariosComponent implements OnInit {

  
  public isEspecialista:boolean;
  public listaUsuarios:Array<Especialistas> | Array<Pacientes>;

  constructor(
    public route:ActivatedRoute,
    public ingresoService:IngresoService
  ) { 
    this.route.params.subscribe((params:Params) => this.isEspecialista = params.isEspecialista);
    
  }

  ngOnInit(): void {
    if(this.isEspecialista){
      this.ingresoService.getAllEspecialistas().snapshotChanges().pipe(  
        map(data =>{
          console.log(data);
          this.listaUsuarios = [];
          data.map(esp => {
            this.listaUsuarios.push(esp.payload.doc.data());
          })
        })
      ).subscribe();
    }
    }
    
  }

}
