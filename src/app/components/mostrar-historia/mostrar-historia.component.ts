import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-historia',
  templateUrl: './mostrar-historia.component.html',
  styleUrls: ['./mostrar-historia.component.css']
})
export class MostrarHistoriaComponent implements OnInit {

  @Input() usuarioAMostrar;
  constructor() { }

  ngOnInit(): void {
  }

}
