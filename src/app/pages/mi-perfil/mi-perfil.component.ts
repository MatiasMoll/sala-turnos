import { Component, OnInit } from '@angular/core';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { HorariosEsp } from 'src/app/modelos/horariosEsp/horarios-esp';
import { TurnoService } from 'src/app/services/turno/turno.service';
import { Turno } from 'src/app/modelos/Turno/turno';
import { map } from 'rxjs/operators';
import { ArchivosService } from 'src/app/services/archivos/archivos.service';
import { ChangeTimespanPipe } from 'src/app/pipes/change-timespan.pipe';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public transformer = new ChangeTimespanPipe();

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
  
  mostrarTodos = true;
  listTurnosTotales:Array<Turno> = new Array<Turno>();
  listEspecialidades:Array<string> = new Array<string>();
  listTurnosFilter:Array<Turno> = new Array<Turno>();

  constructor(
    public ingresoService:IngresoService,
    public turnosService:TurnoService,
    public fileService:ArchivosService
  ) { }

  ngOnInit(): void {
    
    if(this.ingresoService.especialistaLogeado != null){
      this.tipoUsuario = 'Especialista';
      this.usuarioLogeado = this.ingresoService.especialistaLogeado;
      console.log(this.usuarioLogeado);
    }else if(this.ingresoService.pacienteLogeado != null){
      this.tipoUsuario = 'Paciente';
      this.usuarioLogeado = this.ingresoService.pacienteLogeado;
      this.turnosService.filtrarTurno('pacienteEmail',this.usuarioLogeado.mail).snapshotChanges().pipe(
        map(datos =>{
          datos.map(turno =>{
            console.log(turno);
            this.listTurnosTotales.push(turno.payload.doc.data());
            var espTurno = turno.payload.doc.data().especialidad;
            if(!this.listEspecialidades.includes(espTurno)){
              this.listEspecialidades.push(espTurno);
            }
          })
        })
      ).subscribe();
    }else{
      this.tipoUsuario = 'Administrador';
      this.usuarioLogeado = this.ingresoService.administradorLogeado;
    }

    console.log(this.usuarioLogeado.fotoUno);
  }

  filtrarTurnoYDescargar(event){
    if(event.target.id == 'Todos'){
      this.descargarTurno(this.listTurnosTotales);
    }else{
      this.listTurnosFilter = new Array<Turno>();
      this.listTurnosTotales.filter(turno => {
        if(turno.especialidad == event.target.id){
          this.listTurnosFilter.push(turno);
        }
      })
      this.descargarTurno(this.listTurnosFilter);
    }
   
  }

  actualizarHorarios(){
    this.ingresoService.updateEspecialista(this.usuarioLogeado.idDocumento,{diasLaborales:(<Especialistas>this.usuarioLogeado).diasLaborales});
  }

  descargarTurno(arrayturnos){
    
    let mapData:Map<string,Array<string>> = new Map<string,Array<string>>();
    let  json_data = [];
    arrayturnos.map(turnoAMostrar => {
      json_data.push({
        estado:turnoAMostrar.estado,
        especialista:turnoAMostrar.medico.nombre + ' ' + turnoAMostrar.medico.apellido,
        especialistaMail:turnoAMostrar.medicoEmail,
        especialidad:turnoAMostrar.especialidad,
        paciente:turnoAMostrar.paciente.nombre + ' ' + turnoAMostrar.paciente.apellido,
        pacienteMail:turnoAMostrar.paciente.mail,
        fechaHora:turnoAMostrar.horario,
        pedidoEl:this.transformer.transform(turnoAMostrar.pedidoEl)
      })
    });
    let arrayHeader = ['Estado Turno','Nombre Especialista','Email Especialista','Especialidad','Nombre Paciente','Email paciente','Fecha y hora del turno','Fue pedido el dia '];
    json_data.map(ele=>{
      arrayHeader.push(JSON.stringify(ele));
    });
    mapData.set('Turno',arrayHeader);
    this.fileService.crearYDescargarExcel(mapData,'Datos_Turno');
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
