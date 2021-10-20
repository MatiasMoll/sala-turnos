import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  static nombreUsuario:string;
  public weAreInUsuarios:boolean = false;
  constructor(
    public ingresoService : IngresoService,
    private router: Router,
    private route:ActivatedRoute
  ) { 
    this.router.events.subscribe((val) =>this.weAreInUsuarios = (<NavigationEnd>val).url?.includes('usuarios'));
   
  }

  ngOnInit(): void {  
  }

  routeo(ruta,params = null){

    params != null ? this.router.navigate([ruta,params]) : this.router.navigate(['/'+ruta])

  }

  logOut(){
    this.ingresoService.logout();
  }

  getNombreUsuario() {
    return IngresoService.userNameLogged;
  }
  getCompleteName(){
    return IngresoService.completeName;
  }
}
