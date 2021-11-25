import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/modelos/Turno/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private turnos = '/turnos';
  public turnosRef:AngularFirestoreCollection<Turno>;
  
  private dataBase:AngularFirestore;

  constructor(
    public db: AngularFirestore
  ) {
    this.turnosRef = db.collection(this.turnos);
    this.dataBase = db;
  }

  darDeAltaTurno(turno:Turno){
    this.turnosRef.add({...turno});
    this.updateIdDocumento(turno.pedidoEl);
  }

  filtrarTurno(nombreCampo:string,email:any):AngularFirestoreCollection<Turno>{
    return this.db.collection(this.turnos,ref => ref.where(nombreCampo,'==',email).orderBy('pedidoEl'));
  }

  updateIdDocumento(pedido){
    this.filtrarTurno('pedidoEl',pedido).snapshotChanges().pipe(
      map(data=>{
        data.map(turno =>{
          this.updateTurnoCustom(turno.payload.doc.id,{idDocumento:turno.payload.doc.id});
        })
      })
    ).subscribe();
  }
  getAll() : AngularFirestoreCollection<Turno>{
    return this.turnosRef;
  }

  updateTurno(id,estadoT){
    console.log(id);
    this.db.collection(this.turnos).doc(id).update({estado: estadoT});
  }

  updateTurnoCustom(id,campoValor){
    console.log(id);
    this.db.collection(this.turnos).doc(id).update(campoValor);
  }
}
