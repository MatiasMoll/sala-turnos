import { Component, OnInit } from '@angular/core';
import { IngresoService } from './services/ingreso/ingreso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clinica Online';
  constructor(
    public ingresoService:IngresoService
  ){
   
  }

  
}
