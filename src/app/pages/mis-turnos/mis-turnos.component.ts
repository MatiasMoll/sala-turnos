import { Component, OnInit,Input } from '@angular/core';
import { Turno } from 'src/app/modelos/Turno/turno';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  @Input() listTurnos:Array<Turno>
  constructor() { }

  ngOnInit(): void {
  }

}
