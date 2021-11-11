import { Component, Input, OnInit,EventEmitter,Output} from '@angular/core';


@Component({
  selector: 'app-tabla-especialidades',
  templateUrl: './tabla-especialidades.component.html',
  styleUrls: ['./tabla-especialidades.component.css']
})
export class TablaEspecialidadesComponent implements OnInit {

  @Input() listEspecialidades;
  @Output() eventoEmitirEsp:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitirEspecialidad(esp){
    this.eventoEmitirEsp.emit(esp.especialidad);
  }
}
