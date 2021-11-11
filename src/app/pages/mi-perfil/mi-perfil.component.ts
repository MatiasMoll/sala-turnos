import { Component, OnInit } from '@angular/core';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { HorariosEsp } from 'src/app/modelos/horariosEsp/horarios-esp';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  usuarioLogeado: Especialistas | Pacientes | Administradores;
  listadoHorarios:Array<HorariosEsp>
  tipoUsuario;
  dropdownSettings = {
    textField: 'especialidad',
    enableCheckAll:true,
    selectAllText: 'Marcar todas los dias',
    unSelectAllText: 'Desmarcar todas los dias',
  };
  diasSemana = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
 
  especialidadSeleccionada = '';
  diasSeleccionados = [];
  horaInicio;
  minutosInicio;
  horaFinal;
  minutosFinal;
  
  constructor(
    public ingresoService:IngresoService
  ) { }

  ngOnInit(): void {
    
    if(this.ingresoService.especialistaLogeado != null){
      this.tipoUsuario = 'Especialista';
      this.usuarioLogeado = this.ingresoService.especialistaLogeado;
      console.log(this.usuarioLogeado);
    }else if(this.ingresoService.pacienteLogeado != null){
      this.tipoUsuario = 'Paciente';
      this.usuarioLogeado = this.ingresoService.pacienteLogeado;
    }else{
      this.tipoUsuario = 'Administrador';
      this.usuarioLogeado = this.ingresoService.administradorLogeado;
    }

    console.log(this.usuarioLogeado.fotoUno);
    
  }

  actualizarHorarios(){
    this.ingresoService.updateEspecialista(this.usuarioLogeado.idDocumento,{diasLaborales:(<Especialistas>this.usuarioLogeado).diasLaborales});
  }

  showHorarios(){
    // let objetoHorario = {
    //   esp: this.especialidadSeleccionada,
    //   dias: []
    // }
    // var arrayObjectos = [];
    // this.diasSeleccionados.forEach(dias =>{
    //   let obj = {
    //     diasSemana: dias,
    //     horaInicio: this.horaInicio + ':'+ this.minutosInicio,
    //     horaFinal: this.horaFinal + ':'+ this.minutosFinal
    //   };
    //   arrayObjectos.push(obj);
    // });
    // objetoHorario.dias.push(arrayObjectos);
    // (<Especialistas>this.usuarioLogeado).diasLaborales.push(objetoHorario);
    // console.log(objetoHorario);
    let objetoHorario = {
      esp:this.especialidadSeleccionada,
      horarioLunes:{horaInicio:'',horaFinal:''},
      horarioMartes:{horaInicio:'',horaFinal:''},
      horarioMiercoles:{horaInicio:'',horaFinal:''},
      horarioJueves:{horaInicio:'',horaFinal:''},
      horarioViernes:{horaInicio:'',horaFinal:''},
      horarioSabado:{horaInicio:'',horaFinal:''}
    }
    this.diasSeleccionados.forEach(dia =>{
      switch (dia) {
        case 'Lunes':
          objetoHorario.horarioLunes.horaFinal = this.horaFinal + ':' + this.minutosFinal;  
          objetoHorario.horarioLunes.horaInicio = this.horaInicio + ':' + this.minutosInicio;
        break;
        case 'Martes':
          objetoHorario.horarioMartes.horaFinal = this.horaFinal + ':' + this.minutosFinal;  
          objetoHorario.horarioMartes.horaInicio = this.horaInicio + ':' + this.minutosInicio;
        break;
        case 'Miercoles':
          objetoHorario.horarioMiercoles.horaFinal = this.horaFinal + ':' + this.minutosFinal;  
          objetoHorario.horarioMiercoles.horaInicio = this.horaInicio + ':' + this.minutosInicio;
        break;
        case 'Jueves':
          objetoHorario.horarioJueves.horaFinal = this.horaFinal + ':' + this.minutosFinal;  
          objetoHorario.horarioJueves.horaInicio = this.horaInicio + ':' + this.minutosInicio;
        break;
        case 'Viernes':
          objetoHorario.horarioViernes.horaFinal = this.horaFinal + ':' + this.minutosFinal;  
          objetoHorario.horarioViernes.horaInicio = this.horaInicio + ':' + this.minutosInicio;
        break;
        case 'Sabado':
          objetoHorario.horarioSabado.horaFinal = this.horaFinal + ':' + this.minutosFinal;  
          objetoHorario.horarioSabado.horaInicio = this.horaInicio + ':' + this.minutosInicio;
        break;
      }
    });

    let shouldPush = true;
    for(let i=0 ; i < (<Especialistas>this.usuarioLogeado).diasLaborales.length ; i++){
      let diaLab = (<Especialistas>this.usuarioLogeado).diasLaborales[i];
      if(diaLab.esp == this.especialidadSeleccionada){
        (<Especialistas>this.usuarioLogeado).diasLaborales[i] = objetoHorario;
        shouldPush = false;
      }
    }
    shouldPush ? (<Especialistas>this.usuarioLogeado).diasLaborales.push(objetoHorario) : null;
    this.actualizarHorarios();

  }
}
