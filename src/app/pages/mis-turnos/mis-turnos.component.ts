import { Component, OnInit,Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/modelos/Turno/turno';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  listTurnos = null;
  tipoUsuario = 'paciente';
  filtro:string;
  constructor(
    private turnoService: TurnoService,
    private ingresoService: IngresoService
  ) { }

  ngOnInit(): void {
    this.tipoUsuario = this.ingresoService.especialistaLogeado ? 'especialista' : 'paciente';
    
    console.log(this.ingresoService.administradorLogeado);
    if(this.ingresoService.administradorLogeado != null){
      console.log('entro');
      this.listTurnos  = Array<Turno>();
      this.turnoService.getAll().snapshotChanges().pipe(
        map(data => {
          this.listTurnos  = Array<Turno>();
          data.map(turno =>{
            let turnoRetrieved:Turno = turno.payload.doc.data();
            turnoRetrieved.idDocumento = turno.payload.doc.id;
            this.listTurnos.push(turnoRetrieved);
          })})
      ).subscribe(data => {
         
      });
    }else{
      var campoABuscar = this.ingresoService.especialistaLogeado ? 'medico.mail' : 'paciente.mail';
      var valorABuscar = this.ingresoService.especialistaLogeado ? String(this.ingresoService.especialistaLogeado.mail) : String(this.ingresoService.pacienteLogeado.mail);
      this.listTurnos  = Array<Turno>();
      this.turnoService.filtrarTurno(campoABuscar,valorABuscar).snapshotChanges().pipe(
        map(data => {
          this.listTurnos  = Array<Turno>();
          data.map(turno =>{
            let turnoRetrieved:Turno = turno.payload.doc.data();
            turnoRetrieved.idDocumento = turno.payload.doc.id;
            this.listTurnos.push(turnoRetrieved);
          })})
      ).subscribe(data => {
         
      });
    }
   
    
  }

}
