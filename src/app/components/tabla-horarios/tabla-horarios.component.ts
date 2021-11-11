import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';

@Component({
  selector: 'app-tabla-horarios',
  templateUrl: './tabla-horarios.component.html',
  styleUrls: ['./tabla-horarios.component.css']
})
export class TablaHorariosComponent implements OnInit {

  @Output() horarioSeleccionado:EventEmitter<any> = new EventEmitter<any>();
  @Output() sePidioTurno:EventEmitter<any> = new EventEmitter<any>();
  @Input() listHorarios:Array<string>;
  public seElegigioHorario = false;
  
  constructor() { 
   // this.seElegigioHorario = false;
  }

  ngOnInit(): void {
    //this.seElegigioHorario = false;
  }

  emitirHorario(horario){
    console.log(horario);
    this.seElegigioHorario = true;
    this.horarioSeleccionado.emit(horario);
  }
  
  pedirAlta(){
    this.sePidioTurno.emit(true);
  }


}
