import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/modelos/Turno/turno';
import { ChangeTimespanPipe } from 'src/app/pipes/change-timespan.pipe';
import { ArchivosService } from 'src/app/services/archivos/archivos.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';


@Component({
  selector: 'app-card-turno',
  templateUrl: './card-turno.component.html',
  styleUrls: ['./card-turno.component.css']
})
export class CardTurnoComponent implements OnInit {

  public transformer = new ChangeTimespanPipe();
  @Input() turnoAMostrar:Turno;
  constructor(
    public ingresoService:IngresoService,
    public fileService:ArchivosService
  ) { }

  ngOnInit(): void {
  }

  descargarTurno(){
    let mapData:Map<string,Array<string>> = new Map<string,Array<string>>();
    let json_data = {
      estado:this.turnoAMostrar.estado,
      especialista:this.turnoAMostrar.medico.nombre + ' ' + this.turnoAMostrar.medico.apellido,
      especialistaMail:this.turnoAMostrar.medicoEmail,
      especialidad:this.turnoAMostrar.especialidad,
      paciente:this.turnoAMostrar.paciente.nombre + ' ' + this.turnoAMostrar.paciente.apellido,
      pacienteMail:this.turnoAMostrar.paciente.mail,
      fechaHora:this.turnoAMostrar.horario,
      pedidoEl:this.transformer.transform(this.turnoAMostrar.pedidoEl)
    }
    let arrayHeader = ['Estado Turno','Nombre Especialista','Email Especialista','Especialidad','Nombre Paciente','Email paciente','Fecha y hora del turno','Fue pedido el dia '];
    arrayHeader.push(JSON.stringify(json_data));
    mapData.set('Turno',arrayHeader);
    this.fileService.crearYDescargarExcel(mapData,'Datos_Turno');
  }
  
}
