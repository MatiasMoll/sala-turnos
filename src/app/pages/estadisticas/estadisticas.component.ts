import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/modelos/Turno/turno';
import { ChangeTimespanPipe } from 'src/app/pipes/change-timespan.pipe';
import { ArchivosService } from 'src/app/services/archivos/archivos.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  public options = {
    scaleShowVerticalLines: false,
    responsive:true
  };
  public labels = new Array<string>();
  public type = 'bar';
  public legends = true;
  public data;

  public isShowEstadisticas = false;
  public listDias:Array<string> = new Array<string>();
  public listEspecialidades:Array<string> = new Array<string>();
  public listTurnos:Array<Turno> = new Array<Turno>();
  public arrayData:Array<number> = new Array<number>();
  public listLogs = [{}];

  constructor(
    public turnosService:TurnoService,
    public archivos:ArchivosService,
    public transform:ChangeTimespanPipe,
    public ingresoService:IngresoService
  ) { }

  ngOnInit(): void {

    // this.ingresoService.getAllLogs().snapshotChanges().pipe(
    //   map(data =>{
    //     data.map(log =>{
    //       let logs = log.payload.doc.data();
    //       let dateIngreso = new Date(logs.logged);
    //       this.listLogs.push({usuario:logs.email,logeado:dateIngreso.toString()});
    //     })
    //   })
    // ).subscribe();

    // this.turnosService.getAll().snapshotChanges().pipe(
    //   map(data =>{
    //     data.map(turno =>{
    //       let turnoRetrieved = turno.payload.doc.data();
    //       this.listTurnos.push(turnoRetrieved);
    //       if(!this.listEspecialidades.includes(turnoRetrieved.especialidad)){
    //         this.listEspecialidades.push(turnoRetrieved.especialidad);
    //       }
    //       let auxDia = turnoRetrieved.horario.split(' ')[0];
    //       if(!this.listDias.includes(auxDia)){
    //         this.listDias.push(auxDia);
    //       }
    //     })
       
    //   })
    // ).subscribe();
  }

  descargarGrafico(tipoDesc){
    this.isShowEstadisticas = false;
    let canvas = document.getElementsByTagName('canvas')[0];
    
    if(tipoDesc == 'excel'){
      let mapData = new Map<string,Array<string>>();
      mapData.set('Graficos Turnos',new Array<string>(canvas.toDataURL()));
  
      this.archivos.createExcelWithImage(mapData,'Graficos Turnos');
    }else{
      this.archivos.crearPdf(canvas);
    }


  }

  getTurnoPorEspecialidad(){
    this.isShowEstadisticas = false;
    this.labels = this.listEspecialidades;
    this.arrayData = new Array<number>();
    for(let i = 0; i < this.listEspecialidades.length ; i++){
      let j = 0;
      let especialidadActual = this.listEspecialidades[i];
      this.listTurnos.forEach(turno =>{
        if(turno.especialidad == especialidadActual){
          j++;
        }
      });
      this.arrayData.push(j);
    }
    console.log(this.arrayData);
    this.data = [{data: this.arrayData,label:'Turnos por especialidad'}];
  }

  getTurnoPorDia(){
    this.isShowEstadisticas = false;
    this.labels = this.listDias;
    this.arrayData = new Array<number>();
    for(let i = 0; i < this.listDias.length ; i++){
      let j = 0;
      let horarioActual = this.listDias[i];
      this.listTurnos.forEach(turno =>{
        if(turno.horario.split(' ')[0] == horarioActual){
          j++;
        }
      });
      this.arrayData.push(j);
    }
    console.log(this.arrayData);
    this.data = [{data: this.arrayData,label:'Turnos por Dia'}];
  }

  getTurnoSolicitadosUltimos15Dias(){
    this.isShowEstadisticas = false;
    let dateHoy = new Date();

    let diaHoy = dateHoy.getDate();
    let dia15 = dateHoy.setDate(diaHoy - 15);
    for(let i = diaHoy; i > dia15; i--){
      let aux = dateHoy.setDate(diaHoy - i);
      let j = 0;
      this.listTurnos.forEach(turno =>{
        let diaCreacion = this.transform.transform(turno.pedidoEl);
        if(Number.parseInt(diaCreacion.split(' ')[0].split('/')[0]) == aux){
          j++;
        }
      });
      this.arrayData.push(j);
    }
    console.log(this.arrayData);
    this.data = [{data: this.arrayData,label:'Turnos por Dia'}];
  }

  showEstadisticas(){
    this.isShowEstadisticas = true;
  }

}
