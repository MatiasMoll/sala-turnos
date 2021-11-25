import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/modelos/Turno/turno';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public mapPacienteTurnos:Map<string,Array<Turno>>;
  public listTurnos:Array<Turno>;
  public turnoToShow:Turno;
  public isShowModal = false;
  constructor(
    public turnoService:TurnoService,
    public ingresoService:IngresoService
  ) { }

  ngOnInit(): void {
    this.turnoService.filtrarTurno('medicoEmail',this.ingresoService.especialistaLogeado.mail).valueChanges().pipe(
      map(data => {
        this.listTurnos = new Array<Turno>();
        this.mapPacienteTurnos = new Map<string,Array<Turno>>();

        data.map(turno =>{
          let nombrePaciente = turno.paciente.nombre + ' ' + turno.paciente.apellido;
          if(turno.estado == 'Finalizado'){
            if(this.mapPacienteTurnos.has(nombrePaciente) && this.mapPacienteTurnos.get(nombrePaciente).length != 3 ){
              this.mapPacienteTurnos.get(nombrePaciente).push(turno);
            }else{
              let newArrayTurno = new Array<Turno>(turno);
              this.mapPacienteTurnos.set(nombrePaciente,newArrayTurno);
            }
          }          
          //this.listTurnos.push(turno);
        })
        console.log(this.mapPacienteTurnos);
      })
    ).subscribe();
  }

  showModal(turno){
    console.log(turno);
    this.isShowModal = true;
    this.turnoToShow = turno;
  }

}
