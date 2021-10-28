import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
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
    return this.turnosRef.add({...turno});
  }

  filtrarTurno(nombreCampo:string,email:string):AngularFirestoreCollection<Turno>{
    return this.db.collection(this.turnos,ref => ref.where(nombreCampo,'==',email));
  }

  getAll() : AngularFirestoreCollection<Turno>{
    return this.turnosRef;
  }

  updateTurno(id,estadoT){
    console.log(id);
    this.db.collection(this.turnos).doc(id).update({estado: estadoT});
  }


}
