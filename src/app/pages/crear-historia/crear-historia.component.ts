import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Historia } from 'src/app/modelos/historia/historia';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { HistoriaMedicaService } from 'src/app/services/historiaMedica/historia-medica.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';

@Component({
  selector: 'app-crear-historia',
  templateUrl: './crear-historia.component.html',
  styleUrls: ['./crear-historia.component.css']
})
export class CrearHistoriaComponent implements OnInit {

  public formGroup:FormGroup;
  public historia:Historia = new Historia();
           
  
  constructor(
    public router:Router,
    public auth:IngresoService,
    public route:ActivatedRoute,
    private fb:FormBuilder,
    public historiaService:HistoriaMedicaService
  ) {

  }

 

  ngOnInit(): void {
    this.fb.group({
      'altura':['',[Validators.required]],
      'peso':['',Validators.required],
      'temperatura':['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'presion':['',Validators.required]
    });
  }

  crearHistoriaMedica(){
    this.historia.altura = this.formGroup.getRawValue()['altura'];
    this.historia.peso = this.formGroup.getRawValue()['peso'];
    this.historia.temperatura = this.formGroup.getRawValue()['temperatura'];
    this.historia.presion = this.formGroup.getRawValue()['presion'];

    this.historiaService.darDeAltaHistoria(this.historia);
  }
  // createPaciente(){
  //   return new Pacientes(
  //     this.formGroup.getRawValue()['nombre'],
  //     this.formGroup.getRawValue()['apellido'],
  //     this.formGroup.getRawValue()['edad'],
  //     this.formGroup.getRawValue()['dni'],
  //     this.downloadableURL, 
  //     this.downloadableURL2,
  //     this.formGroup.getRawValue()['obraSocial'],
  //     this.formGroup.getRawValue()['email'],
  //     this.formGroup.getRawValue()['contraseña']
  //   );
  // }


}
