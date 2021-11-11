import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { EstadoTurno, Turno } from 'src/app/modelos/Turno/turno';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {

  public turno:Turno;
  public especialidades: Array<any>;
  public especialistas: Array<Especialistas>;
  public especialistaPorEspecialidad: Array<Especialistas>;

  public especialistaSeleccionado:Especialistas;
  public pacienteSeleccionado:Pacientes;
  public horarioSelected;
  public especialidadSeleccionada;
  public listaHorarios:Array<string> = new Array<string>();

  constructor(
    private turnoService:TurnoService,
    public especialidadesService:EspecialidadService,
    public especialistasService:IngresoService,
    public ingresoService:IngresoService
  ) {
    this.turno = new Turno();
  }

  ngOnInit(){
    this.especialidadesService.getAll().snapshotChanges().pipe(
      map(data =>{
        this.especialidades = [];
        data.map(esp => {
          this.especialidades.push(
            {
              especialidad:esp.payload.doc.data().especialidad,
              foto:esp.payload.doc.data().foto
            }          
          );
        })
      })
    ).subscribe();
  }

  // public especialidades: Array<any>;
  // public especialistas: Array<Especialistas>;
  // public especialistaPorEspecialidad: Array<Especialistas>;
  // public especialidadElegida:string = '';
  // public turno:Turno;
  // public medico:string;
  // public especialista:Especialistas = null;
  // public pacientes:Array<Pacientes>;
  // public pacienteElegido:Pacientes;

  // constructor(
  //   private turnoService:TurnoService,
  //   public especialidadesService:EspecialidadService,
  //   public ingresoService:IngresoService
  // ) {
  //   this.turno = new Turno();
  //  }

  // ngOnInit(): void {
  //   this.especialidadesService.getAll().snapshotChanges().pipe(
  //     map(data =>{
  //       console.log(data);
  //       this.especialidades = [];
  //       data.map(esp => {
  //         console.log(esp.payload.doc.data().especialidad);
  //         this.especialidades.push(esp.payload.doc.data().especialidad);
  //       })
  //     })
  //   ).subscribe();
  //   if(this.ingresoService.administradorLogeado != null){
  //     this.ingresoService.getAllPacientes().snapshotChanges().pipe(
  //       map(data => {
  //         this.pacientes = new Array<Pacientes>();
  //         data.map(pac => this.pacientes.push(pac.payload.doc.data()));
  //       })
  //     ).subscribe();
  //   }
  // }

  filterEspecialistas(event){
    this.especialidadSeleccionada = event;
    this.ingresoService.getEspecialistaPorEspecialidad(event).snapshotChanges().pipe(
      map(data => {
        this.especialistaPorEspecialidad = [];
        data.map(especialistas => this.especialistaPorEspecialidad.push(especialistas.payload.doc.data()))
        if(this.especialistaPorEspecialidad.length == 1){
          this.especialistaSeleccionado = this.especialistaPorEspecialidad[0];
          this.tomaEspYArmarHorario(this.especialistaPorEspecialidad[0]);
        }
      })).subscribe();
    this.listaHorarios = [];
   
  }

  setHorario(event){
    this.horarioSelected = event;
  }

  tomaEspYArmarHorario(event){
    this.listaHorarios = [];
    let numeroDiaSemana:Map<number,Object> = new Map<number,{horaInicio:'',horaFinal:'',minutosInicio:'',minutosFinal:''}>();
    this.especialistaSeleccionado = event;
    event.diasLaborales.forEach(dia =>{
      if(dia.esp == this.especialidadSeleccionada){
        numeroDiaSemana = this.getMapNumberHorarios(dia);
      }
    });
 
    let today = new Date();
    let diaAEvaluar = new Date();
    for(let i=1;i<=15;i++){
      let horaToPush = '';
      console.log(diaAEvaluar);
      if(numeroDiaSemana.has(diaAEvaluar.getDay()) && !this.listaHorarios.includes(diaAEvaluar.toDateString())){
          let objHora:any = numeroDiaSemana.get(diaAEvaluar.getDay());
          let horaFinal:string = objHora.horaFinal + '';
          let horaInicio:string = objHora.horaInicio + '';
          let arrayHoraInicio = parseInt(horaInicio.split(':')[0]);
          let arrayHoraFinal = parseInt(horaFinal.split(':')[0]);
          for(let j = 2; arrayHoraInicio <  arrayHoraFinal ;j++){
            let minutos = '00';
            if(parseInt(horaInicio.split(':')[1]) == 30){
              minutos = j % 2 == 0 ? '30' : '00';
            }else{
              minutos = j % 2 == 0 ? '00' : '30';
            }
            horaToPush = diaAEvaluar.getDate() + '/' + ((diaAEvaluar.getMonth())+1) + ' ' +arrayHoraInicio +':'+ minutos;
            if(minutos == '30'){
              arrayHoraInicio += 1;
            }
                    
            if(!(<Especialistas>event).horaiosLaborales.includes(horaToPush)){{
              this.listaHorarios.push(horaToPush);
            } 
            
          }
          console.log(objHora);
    
        }
      
      }
      diaAEvaluar.setDate(today.getDate()+i);
    }
    if(this.listaHorarios.length==1){
      this.horarioSelected = this.listaHorarios[0];
      this.altaTurno();
    }
  }
  
  getMapNumberHorarios(dia){
    let numeroDiaSemana:Map<number,any> = new Map<number,{horaInicio:'',horaFinal:''}>();
    if(dia.horarioLunes.horaInicio != ''){
      numeroDiaSemana.set(1,this.getMap(dia.horarioLunes));
    }else if(dia.horarioMartes.horaInicio != ''){
      numeroDiaSemana.set(2,this.getMap(dia.horarioMartes));
    }else if(dia.horarioMiercoles.horaInicio != ''){
      numeroDiaSemana.set(3,this.getMap(dia.horarioMiercoles));
    }else  if(dia.horarioJueves.horaInicio != ''){
      numeroDiaSemana.set(4,this.getMap(dia.horarioJueves));
    }else if(dia.horarioViernes.horaInicio != ''){
      numeroDiaSemana.set(5,this.getMap(dia.horarioViernes));
    } if(dia.horarioSabado.horaInicio != ''){
      numeroDiaSemana.set(6,this.getMap(dia.horarioSabado));
    }
    return numeroDiaSemana
  }

  getMap(horarioDia){
    return {
      horaInicio:horarioDia.horaInicio,
      horaFinal:horarioDia.horaFinal
    };
  }


  altaTurno(){
    let turnoAlta = new Turno();
    turnoAlta.estado = EstadoTurno.Pedido;
    turnoAlta.comentario = '';
    turnoAlta.especialidad = this.especialidadSeleccionada;
    turnoAlta.horario = this.horarioSelected;
    turnoAlta.medico = this.especialistaSeleccionado;
    turnoAlta.medicoEmail = this.especialistaSeleccionado.mail;
    turnoAlta.paciente = this.ingresoService.administradorLogeado != null ? this.pacienteSeleccionado : this.ingresoService.pacienteLogeado;
    console.log(turnoAlta.paciente);
    turnoAlta.pacienteEmail = turnoAlta.paciente.mail;
    turnoAlta.pedidoEl = new Date();

    let year = (new Date()).getFullYear();
    let arrayDiasHoras = this.horarioSelected.split(' ');
    let horarioArrayHoras = arrayDiasHoras[1].split(':');
    let horarioArrayDiaMes = arrayDiasHoras[0].split('/');
    
    //let horaTurno = new Date(year,horarioArrayDiaMes[1]-1,horarioArrayDiaMes[0],horarioArrayHoras[0],horarioArrayHoras[1]);
  
    this.especialistaSeleccionado.horaiosLaborales.push(turnoAlta.horario);
    this.especialistasService.updateEspecialista(this.especialistaSeleccionado.idDocumento,{horaiosLaborales:this.especialistaSeleccionado.horaiosLaborales});
    this.turnoService.darDeAltaTurno(turnoAlta);
    this.especialistaSeleccionado = null;
    this.listaHorarios = null;

  }
}
