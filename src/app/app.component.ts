import { Component, OnInit } from '@angular/core';
import { IngresoService } from './services/ingreso/ingreso.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalaDeTurnos';
  constructor(
    public ingresoService:IngresoService
  ){}
}
