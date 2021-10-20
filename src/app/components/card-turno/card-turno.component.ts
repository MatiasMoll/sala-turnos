import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/modelos/Turno/turno';

@Component({
  selector: 'app-card-turno',
  templateUrl: './card-turno.component.html',
  styleUrls: ['./card-turno.component.css']
})
export class CardTurnoComponent implements OnInit {

  @Input() turnoAMostrar:Turno;
  public estado:String;

  
  constructor() { }

  ngOnInit(): void {
    console.log(this.turnoAMostrar);
    if(this.turnoAMostrar.realizado){
      this.estado = 'Finalizado';
    }else if(!this.turnoAMostrar.realizado && !this.turnoAMostrar.cancelado){
      this.estado = 'Agendado';
    }else if(!this.turnoAMostrar.realizado && this.turnoAMostrar.cancelado){
      this.estado = 'Cancelado';
    }
  }

}
