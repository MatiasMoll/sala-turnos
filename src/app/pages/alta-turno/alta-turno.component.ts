import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Turno } from 'src/app/modelos/Turno/turno';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  public especialidades: Array<any>;
  public especialistas: Array<Especialistas>;
  public especialistaPorEspecialidad: Array<Especialistas>;
  public especialidadElegida:string = '';
  public turno:Turno;
  public medico:string;
  public especialista:Especialistas = null;

  constructor(
    private turnoService:TurnoService,
    public especialidadesService:EspecialidadService,
    public ingresoService:IngresoService
  ) {
    this.turno = new Turno();
   }

  ngOnInit(): void {
    this.especialidadesService.getAll().snapshotChanges().pipe(
      map(data =>{
        console.log(data);
        this.especialidades = [];
        data.map(esp => {
          console.log(esp.payload.doc.data().especialidad);
          this.especialidades.push(esp.payload.doc.data().especialidad);
        })
      })
    ).subscribe();
  }

  filterEspecialistas(){
    console.log('test ' + this.especialidadElegida);
    this.ingresoService.getEspecialistaPorEspecialidad(this.especialidadElegida).snapshotChanges().pipe(
      map(data => {
        this.especialistaPorEspecialidad = [];
        data.map(especialistas => this.especialistaPorEspecialidad.push(especialistas.payload.doc.data()))
      })).subscribe();
  }

  darDeAltaTurno(){
    var subido = false;
    this.ingresoService.getEspecilista(this.medico).snapshotChanges().pipe(map(data=>data.map(esp => {
      if(!subido){
        this.especialista = esp.payload.doc.data();
        this.turno.pedidoEl = new Date();
        this.turno.paciente = this.ingresoService.pacienteLogeado;
        this.turno.medico = this.especialista;
        this.turno.medicoEmail = this.especialista.mail;
        this.turno.pacienteEmail = this.ingresoService.pacienteLogeado.mail;
        this.turno.especialidad = this.especialidadElegida;
        this.turnoService.darDeAltaTurno(this.turno);
        subido = true;
      }

    }))).subscribe();
    console.log(this.turno);
    
     


  }
}
