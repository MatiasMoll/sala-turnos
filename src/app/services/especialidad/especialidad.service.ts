import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private dbPath = '/especialidades';

  EspecialidadesRef: AngularFirestoreCollection<any>;
 
  constructor(
    private db: AngularFirestore,
    private af: AngularFireAuth
  ) {
    this.EspecialidadesRef = db.collection(this.dbPath);

  }

  getAll(): AngularFirestoreCollection<any> {
    console.log(this.EspecialidadesRef);
    return this.EspecialidadesRef;
  }

  create(especialidad: any): any {
    return this.EspecialidadesRef.add({...especialidad });
  }

}
