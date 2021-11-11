import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.css']
})
export class TablaEspecialistasComponent implements OnInit {

  @Input() listEspecialistas:Array<Especialistas> = new Array<Especialistas>();
  @Output() emitirEspecialista: EventEmitter<Especialistas> = new EventEmitter<Especialistas>();
  constructor() { 
   
    if(this.listEspecialistas.length == 1){
      this.emitirEspecialista.emit(this.listEspecialistas[0]);
    }
  }

  ngOnInit(): void {

  }

  emitirEspecialistaSelect(espe){
    this.emitirEspecialista.emit(espe);
  }
}
