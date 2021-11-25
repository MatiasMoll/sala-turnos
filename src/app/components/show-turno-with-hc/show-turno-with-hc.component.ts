import { Component, Input, OnInit, SimpleChanges,EventEmitter,Output } from '@angular/core';
import { Turno, EstadoTurno } from 'src/app/modelos/Turno/turno';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';


@Component({
  selector: 'app-show-turno-with-hc',
  templateUrl: './show-turno-with-hc.component.html',
  styleUrls: ['./show-turno-with-hc.component.css']
})
export class ShowTurnoWithHCComponent implements OnInit {

  @Input() turnoAMostrar:Turno; 
  
  public altaHistoria; 
  constructor(
    public ingresoService:IngresoService,
    public turnoService:TurnoService
  ) {

  }

  ngOnInit(): void {

  }
}
