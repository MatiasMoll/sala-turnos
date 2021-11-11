import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Historia } from 'src/app/modelos/historia/historia';


@Injectable({
  providedIn: 'root'
})
export class HistoriaMedicaService {
  private historiaMedica = '/historiaMedica';
  public historiaMedicaRef:AngularFirestoreCollection<Historia>;
  
  private dataBase:AngularFirestore;

  constructor(
    public db: AngularFirestore
  ) {
    this.historiaMedicaRef = db.collection(this.historiaMedica);
    this.dataBase = db;
  }

  darDeAltaHistoria(Historia){
    return this.historiaMedicaRef.add({...Historia});
  }

  filtrarHistoria(nombreCampo:string,email:string):AngularFirestoreCollection<Historia>{
    return this.db.collection(this.historiaMedica,ref => ref.where(nombreCampo,'==',email));
  }

  getAll() : AngularFirestoreCollection<Historia>{
    return this.historiaMedicaRef;
  }

  updateHistoria(id,estadoT){
    console.log(id);
    this.db.collection(this.historiaMedica).doc(id).update({estado: estadoT});
  }

}
