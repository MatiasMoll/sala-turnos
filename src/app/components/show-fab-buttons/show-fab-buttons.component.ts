import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';


@Component({
  selector: 'app-show-fab-buttons',
  templateUrl: './show-fab-buttons.component.html',
  styleUrls: ['./show-fab-buttons.component.css']
})
export class ShowFabButtonsComponent implements OnInit {

  @Input() arrayUsuarios:Array<Pacientes> | Array<Especialistas> | Array<Administradores>;
  @Output() emitirUsuarioSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitirUsuarioSelected(usuario){
    this.emitirUsuarioSeleccionado.emit(usuario);
  }

}
