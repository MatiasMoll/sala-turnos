import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-mostrar-historia',
  templateUrl: './mostrar-historia.component.html',
  styleUrls: ['./mostrar-historia.component.css'],
  
})
export class MostrarHistoriaComponent implements OnInit {

  @Input() usuarioAMostrar;
  @Output() emitirCerrarVentana:EventEmitter<any> = new EventEmitter<any>();
  dataExtra:Array<Object> = new Array<Object>();
  constructor() { }

  ngOnInit(): void {
    if(this.usuarioAMostrar.historia.randomData != null){
      console.log(this.usuarioAMostrar.historia.randomData);
      let keys = Object.keys(this.usuarioAMostrar.historia.randomData);
      for(let x of keys){
        this.dataExtra.push({key:x,data:this.usuarioAMostrar.historia.randomData[x].value});
      }
    }
  }

  cerrarVentana(){
    this.emitirCerrarVentana.emit(false);
  }
}
