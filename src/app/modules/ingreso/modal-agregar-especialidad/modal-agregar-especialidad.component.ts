import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';

@Component({
  selector: 'app-modal-agregar-especialidad',
  templateUrl: './modal-agregar-especialidad.component.html',
  styleUrls: ['./modal-agregar-especialidad.component.css']
})
export class ModalAgregarEspecialidadComponent implements OnInit {


  @Output() eventClose:EventEmitter<any>;
  @Output() eventNewSpeciality:EventEmitter<any>;
  public nameSpeciality: string = '';

  constructor(
    public especialidadesService:EspecialidadService
  ) {
    this.eventNewSpeciality = new EventEmitter<any>();
    this.eventClose = new EventEmitter<any>();
  }

  ngOnInit(): void {

  }

  eventoCerrar(){
    this.eventClose.emit();
  }

  agregarEspecialidad(){
    console.log(this.nameSpeciality);
    this.eventNewSpeciality.emit(this.nameSpeciality);
  }

  
}
