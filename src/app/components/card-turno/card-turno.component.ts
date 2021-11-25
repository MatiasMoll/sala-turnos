import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Turno,EstadoTurno } from 'src/app/modelos/Turno/turno';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';

@Component({
  selector: 'app-card-turno',
  templateUrl: './card-turno.component.html',
  styleUrls: ['./card-turno.component.css']
})
export class CardTurnoComponent implements OnInit,OnChanges {

  @Input() turnoAMostrar:Turno; 
  public altaHistoria; 
  constructor(
    public ingresoService:IngresoService,
    public turnoService:TurnoService
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.turnoAMostrar.estado == EstadoTurno.Finalizado && this.turnoAMostrar.paciente.historia == undefined ){
      this.altaHistoria = true;
    }
  }
  ngOnInit(): void {

  }

  cambiarEstado(event){
    console.log(event.target.id);
    if(event.target.id == 'Finalizado'){
      this.altaHistoria = true;
    }
    this.turnoService.updateTurno(this.turnoAMostrar.idDocumento,event.target.id);
   
    
  }


}
