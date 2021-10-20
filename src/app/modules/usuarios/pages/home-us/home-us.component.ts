import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-us',
  templateUrl: './home-us.component.html',
  styleUrls: ['./home-us.component.css']
})
export class HomeUsComponent implements OnInit {

  constructor(
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  irRegistro(tipoUsuario:string){
    this.router.navigate(['ingreso/registro',tipoUsuario]);
  }
}
