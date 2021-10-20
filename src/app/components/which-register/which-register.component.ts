import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-which-register',
  templateUrl: './which-register.component.html',
  styleUrls: ['./which-register.component.css']
})
export class WhichRegisterComponent implements OnInit {

  @Output() eventoCerrarRegistro: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventoRegistrarUsuario: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public router:Router
  ) { 
    
  }

  ngOnInit(): void {
  }

  seCerroElRegistro(){
    this.eventoCerrarRegistro.emit(false);
  }

  irRegistro(tipoUsuario:string){
    this.router.navigate(['ingreso/registro',tipoUsuario]);
  }

}
