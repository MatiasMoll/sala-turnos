import { Component, OnInit,Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { Turno } from 'src/app/modelos/Turno/turno';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';

@Component({
  selector: 'app-show-hc',
  templateUrl: './show-hc.component.html',
  styleUrls: ['./show-hc.component.css']
})
export class ShowHCComponent implements OnInit {

  @Input() turnoShowHC:Turno;
 
  constructor(
    public ingresoService:IngresoService
  ) { }

  ngOnInit(): void {
  
  }

}
