import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { ArchivosService } from 'src/app/services/archivos/archivos.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';

@Component({
  selector: 'app-home-us',
  templateUrl: './home-us.component.html',
  styleUrls: ['./home-us.component.css']
})
export class HomeUsComponent implements OnInit {

  constructor(
    public router:Router,
    public ingreso:IngresoService,
    public archivo:ArchivosService
  ) { }

  ngOnInit(): void {
  }

  irRegistro(tipoUsuario:string){
    this.router.navigate(['ingreso/registro',tipoUsuario]);
  }

  descargarExcel(){
    let listaPacientes:Array<Pacientes> = [];
    let listaEspecialistas:Array<Especialistas> = [];
    let mapData:Map<string,Array<string>> = new Map<string,Array<string>>();
    this.ingreso.getAllPacientes().snapshotChanges().pipe(
      map(data =>{
        data.map(paciente =>{
          listaPacientes.push(paciente.payload.doc.data());
        });
        let json_data_paciente = []; 
        let arrayHeaders = ['Nombre','Apellido','Edad','DNI','Obra Social','Mail'];
    
        listaPacientes.forEach(user =>{
          json_data_paciente.push({
            Nombre: user.nombre,
            Apellido: user.apellido,
            Edad: user.edad,
            DNI: user.dni,
            Obra_Social: user.obraSocial,
            Mail: user.mail
          });
        });
    
        json_data_paciente.map(ele=>{
          arrayHeaders.push(JSON.stringify(ele));
        });
        mapData.set('Pacientes',arrayHeaders);
      })
    ).subscribe();

    this.ingreso.getAllEspecialistas().valueChanges().pipe(
      map(data =>{
        data.map(espec =>{
          listaEspecialistas.push(espec);
        });
        
        let json_data_especialista = [];
        let arrayHeadersEsp = ['Nombre','Apellido','Edad','DNI','Especialidad','Mail'];
        listaEspecialistas.forEach(user =>{
          json_data_especialista.push({
            Nombre: user.nombre,
            Apellido: user.apellido,
            Edad: user.edad,
            DNI: user.dni,
            Especialidad: user.especialidad,
            Mail: user.mail
          });
        });
        json_data_especialista.map(ele=>{
          arrayHeadersEsp.push(JSON.stringify(ele));
        });

        mapData.set('Especialistas',arrayHeadersEsp);
        this.archivo.crearYDescargarExcel(mapData,'Usuarios_Clinica');

      })
    ).subscribe();


      


   
  }
}
