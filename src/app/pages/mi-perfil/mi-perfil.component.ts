import { Component, OnInit } from '@angular/core';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  usuarioLogeado: Especialistas | Pacientes | Administradores;
  tipoUsuario;
  constructor(
    public ingresoService:IngresoService
  ) { }

  ngOnInit(): void {
    if(this.ingresoService.especialistaLogeado != null){
      this.tipoUsuario = 'Especialista';
      this.usuarioLogeado = this.ingresoService.especialistaLogeado;
    }else if(this.ingresoService.pacienteLogeado != null){
      this.tipoUsuario = 'Paciente';
      this.usuarioLogeado = this.ingresoService.pacienteLogeado;
    }else{
      this.tipoUsuario = 'Administrador';
      this.usuarioLogeado = this.ingresoService.administradorLogeado;
    }
  }

}
