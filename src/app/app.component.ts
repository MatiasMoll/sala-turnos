import { Component, OnInit } from '@angular/core';
import { IngresoService } from './services/ingreso/ingreso.service';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'Clinica Online';
  constructor(
    public ingresoService:IngresoService
  ){
   
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  
}
