import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { map } from 'rxjs/operators';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public fileName = '';

  dropdownSettings = {
    textField: 'especialidad',
    enableCheckAll:true,
    selectAllText: 'Marcar todas las especialidades',
    unSelectAllText: 'Desmarcar todas las especialidades',
  };
  
  public nuevoUsr:string;
  public nuevoPass:string;
  public mostrarModal:Boolean = false;
  public captchaResolved = false;

  public nuevoPaciente:Pacientes = null;
  public nuevosEspecialista:Especialistas = null;
  public nuevoAdmisnitrador:Administradores = null;

  public modal:Object = {'titulo':'','cuerpo':''};
  public tipoRegistro;
  public formGroup:FormGroup;
  public seAgregoEsp:boolean;
  public especialidades = [];

  basePath = '/images';                       
  downloadableURL = '';  
  downloadableURL2 = '';                       
  task!: AngularFireUploadTask;
  progressValue!: Observable<any>;
  
  constructor(
    public router:Router,
    public auth:IngresoService,
    public route:ActivatedRoute,
    private fb:FormBuilder,
    public especialidadesService:EspecialidadService,
    public http:HttpClient,
    public fireStorage:AngularFireStorage
  ) {

  }

  async onFileChanged($event:any) {
    const file = $event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.fireStorage.upload(filePath, file);    // upload task

      this.progressValue = this.task.percentageChanges();       // <<<<< Percentage of uploading is given
      (await this.task).ref.getDownloadURL().then(url => { 
        if(this.downloadableURL == '' && this.downloadableURL2 == ''){
          this.downloadableURL = url;
        }else if(this.downloadableURL != '' && this.downloadableURL2 == ''){
          this.downloadableURL2 = url;
        }      
      });  // <<< url is found here
    } else {
      this.downloadableURL = '';
    }
  }

  ngOnInit(): void {
    this.downloadableURL = '';  
    this.downloadableURL2 = '';
    this.getEspecialidades();
    this.route.params.subscribe((params:Params)=>this.tipoRegistro = params.tipoRegistro);
    console.log(this.tipoRegistro);
    if(this.tipoRegistro == 'paciente'){
      this.formGroup = this.formGroupPaciente();
    }else if(this.tipoRegistro == 'especialista'){
      this.formGroup = this.formGroupEspecialista();
    }else{
      this.formGroup = this.formGroupAdministrador();
    }
   
  }

  formGroupAdministrador(){
    return this.fb.group({
      'nombre':['',[Validators.required,this.spaceValidator]],
      'apellido':['',Validators.required],
      'edad':['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'contraseña':['',Validators.required],
      'foto':['',Validators.required],
      'reCaptcha':['',Validators.required]
    });
  }

  formGroupEspecialista(){
    return this.fb.group({
      'nombre':['',[Validators.required,this.spaceValidator]],
      'apellido':['',Validators.required],
      'edad':['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'contraseña':['',Validators.required],
      'especialidad':['',Validators.required],
      'foto':['',Validators.required],
      'reCaptcha':['',Validators.required]
    });
  }
  
  formGroupPaciente(){
    return this.fb.group({
      'nombre':['',[Validators.required,this.spaceValidator]],
      'apellido':['',Validators.required],
      'edad':['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'contraseña':['',Validators.required],
      'obraSocial':['',Validators.required],
      'foto':['',Validators.required],
      'fotoDos':['',Validators.required],
      'reCaptcha':['',Validators.required]
    });
  }


  getEspecialidades():void{
    console.log('testss');
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

  agregarEsp(){
    console.log(this.formGroup.controls['especialidad'].value);
    if(this.formGroup.controls['especialidad'].value == 'agregar'){
      this.seAgregoEsp = true;
    }else{
      this.seAgregoEsp = false;
    }
  }

  registroWithEmailAndPassword(){
  
    if(this.tipoRegistro == 'especialista'){
      this.nuevosEspecialista = this.createEspecialista();
    }else if(this.tipoRegistro == 'paciente'){
      this.nuevoPaciente = this.createPaciente();
    }else{
      this.nuevoAdmisnitrador = this.createAdministrador();
    }
    
    this.auth.registroWithEmailAndPassword(this.nuevoPaciente != null ? this.nuevoPaciente : this.nuevosEspecialista != null ? this.nuevosEspecialista : this.nuevoAdmisnitrador);
  }

  seCreoNuevaEspecialidad($event){
    this.especialidadesService.create($event);
  } 

  createAdministrador(){
    return new Administradores(
      this.formGroup.getRawValue()['nombre'],
      this.formGroup.getRawValue()['apellido'],
      this.formGroup.getRawValue()['edad'],
      this.formGroup.getRawValue()['dni'],
      this.downloadableURL,
      this.formGroup.getRawValue()['email'],
      this.formGroup.getRawValue()['contraseña']
    );
  }

  createEspecialista(){
    return new Especialistas(
      this.formGroup.getRawValue()['nombre'],
      this.formGroup.getRawValue()['apellido'],
      this.formGroup.getRawValue()['edad'],
      this.formGroup.getRawValue()['dni'],
      this.downloadableURL,
      this.formGroup.getRawValue()['especialidad'],
      this.formGroup.getRawValue()['email'],
      this.formGroup.getRawValue()['contraseña'],
      false
    );
  }

  createPaciente(){
    return new Pacientes(
      this.formGroup.getRawValue()['nombre'],
      this.formGroup.getRawValue()['apellido'],
      this.formGroup.getRawValue()['edad'],
      this.formGroup.getRawValue()['dni'],
      this.downloadableURL, 
      this.downloadableURL2,
      this.formGroup.getRawValue()['obraSocial'],
      this.formGroup.getRawValue()['email'],
      this.formGroup.getRawValue()['contraseña']
    );
  }

  private spaceValidator(control: AbstractControl): null | object {
    const nombre = <string> control.value;
    const espacios = nombre.includes(' ');

    if(espacios){
      return {
        contieneEspacios:true
      }
    }else{
      return null;
    }
  }


}
