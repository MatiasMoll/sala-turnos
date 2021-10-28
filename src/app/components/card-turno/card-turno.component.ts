import { Component, Input, OnInit } from '@angular/core';
import { Turno,EstadoTurno } from 'src/app/modelos/Turno/turno';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';

@Component({
  selector: 'app-card-turno',
  templateUrl: './card-turno.component.html',
  styleUrls: ['./card-turno.component.css']
})
export class CardTurnoComponent implements OnInit {

  @Input() turnoAMostrar:Turno;  
  constructor(
    public ingresoService:IngresoService,
    public turnoService:TurnoService
  ) {
      
  }

  ngOnInit(): void {
    console.log(this.turnoAMostrar);
  }

  cambiarEstado($event){
    console.log($event.target.id);
    this.turnoService.updateTurno(this.turnoAMostrar.idDocumento,$event.target.id);
  }


}
