import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit,EventEmitter,Output} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Historia } from 'src/app/modelos/historia/historia';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { Turno } from 'src/app/modelos/Turno/turno';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { HistoriaMedicaService } from 'src/app/services/historiaMedica/historia-medica.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { TurnoService } from 'src/app/services/turno/turno.service';


@Component({
  selector: 'app-crear-historia',
  templateUrl: './crear-historia.component.html',
  styleUrls: ['./crear-historia.component.css']
})
export class CrearHistoriaComponent implements OnInit {

  public formGroup:FormGroup;
  public historia:Historia = new Historia();
  @Input() usuarioADarAlta:Pacientes;
  @Input() turnoUpdate:Turno;
  @Input() medicoMail:string;
  @Output() emitCerrarAlta:EventEmitter<any> = new EventEmitter<any>();
  public valoresAdicionales = [{key: '',value:''}]
  public desBoton = false;
  
  constructor(
    public router:Router,
    public auth:IngresoService,
    public route:ActivatedRoute,
    private fb:FormBuilder,
    public historiaService:HistoriaMedicaService,
    public ingresoService:IngresoService,
    public turnoService:TurnoService
  ) {

  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  seAgregoDato(){
      this.valoresAdicionales.push({key:'',value:''});
      if(this.valoresAdicionales.length == 3){
      this.desBoton = true;
    }
   
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'altura':['',[Validators.required]],
      'peso':['',Validators.required],
      'temperatura':['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'presion':['',Validators.required]
    });
  }
  cerrarModal(){
    this.emitCerrarAlta.emit();
  }

  crearHistoriaMedica(){
    console.log(this.valoresAdicionales);
    this.historia.altura = this.formGroup.getRawValue()['altura'];
    this.historia.peso = this.formGroup.getRawValue()['peso'];
    this.historia.temperatura = this.formGroup.getRawValue()['temperatura'];
    this.historia.presion = this.formGroup.getRawValue()['presion'];
    this.historia.randomData = this.valoresAdicionales;
    this.historia.pacienteMail = this.usuarioADarAlta.mail;
    this.historia.medicoMail = this.medicoMail;
    this.usuarioADarAlta.historia = JSON.parse(JSON.stringify(this.historia));
    this.ingresoService.updatePaciente(this.usuarioADarAlta.idDocumento,{historia:JSON.parse(JSON.stringify(this.historia))});
    this.turnoService.updateTurnoCustom(this.turnoUpdate.idDocumento,{historia:JSON.parse(JSON.stringify(this.historia))});
    console.log(this.historia);
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
