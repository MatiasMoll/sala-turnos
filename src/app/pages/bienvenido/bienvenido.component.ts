import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  showWhichRegister = false;
  constructor(
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  routeo(ruta){
    this.router.navigateByUrl('/'+ruta);
  }

  test(){
    this.showWhichRegister = true; 
    console.log('test');
  }
}
