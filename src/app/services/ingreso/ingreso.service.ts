import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
//import { NavBarComponent } from '../components/nav-bar/nav-bar.component';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

    private usersLogged:string = '/userLogged';
    private pacientes = '/paciente';
    private especialistas = '/especialistas';
    private administradores = '/administradores';


    public administradorLogeado:Administradores;
    public especialistaLogeado: Especialistas;
    public pacienteLogeado: Pacientes;

    public subscritoP;
    public subscritoE;
    public subscritoA;
    public isLogged:boolean = false;

    public static userNameLogged:string;
    public static completeName:string;
    public static iudUserLogged:string;
    public static showSpinner = false;

    UsuariosRef: AngularFirestoreCollection<any>;
    PacientesRef: AngularFirestoreCollection<Pacientes>;
    EspecialistasRef: AngularFirestoreCollection<Especialistas>;
    AdministradoresRef:AngularFirestoreCollection<Administradores>;

    constructor(
        public afAuth: AngularFireAuth,
        public router: Router, // Inject Firebase auth service
        public db:AngularFirestore
    ) { 
        this.AdministradoresRef = db.collection(this.administradores);
        this.UsuariosRef = db.collection(this.usersLogged);
        this.PacientesRef = db.collection(this.pacientes);
        this.EspecialistasRef = db.collection(this.especialistas);
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => {
          console.log('You have been successfully logged in!');
          console.log(provider);
          console.log(result.additionalUserInfo.profile);
          IngresoService.userNameLogged = result.additionalUserInfo.profile['name'];
          IngresoService.iudUserLogged = result.additionalUserInfo.profile['id'];
          this.isLogged = true;
          
          this.router.navigate(['home']);

      }).catch((error) => {
          console.log(error)
      })
    }

    //Auth with emailAndPassword
    loginWithEmailAndPassword(name:string,pass:string){
      this.afAuth.signInWithEmailAndPassword(name,pass)
            .then((result)=>{
                this.subscritoE = this.checkIfLoginEspecialista(name,result);
                this.subscritoP = this.checkIfLoginPaciente(name,result);
                this.subscritoA = this.checkIfLoginAdministrador(name,result);
            })
            .catch((res)=>{
                alert(res);
                this.router.navigate(['error']);  
            });      
    }
  

    registroWithEmailAndPassword(nuevoUsuario: Especialistas | Pacientes | Administradores){

        return this.afAuth.createUserWithEmailAndPassword(nuevoUsuario.mail,nuevoUsuario.pass).then(
            () =>{
                if('especialidad' in nuevoUsuario){
                    this.addEspecialsita(nuevoUsuario);
                }else if ('obraSocial' in  nuevoUsuario){
                    this.addPaciente(nuevoUsuario);
                }else{
                    this.addAdministrador(nuevoUsuario);
                }
                IngresoService.showSpinner = false;
                this.router.navigate(['bienvenido']);
                this.afAuth.currentUser.then(u => u.sendEmailVerification());
        })
    }

    //Especialistas
    getEspecilista(mail):AngularFirestoreCollection<Especialistas>{
        return this.db.collection(this.especialistas,ref => ref.where('mail','==',mail))
    }

    addEspecialsita(especialista){
        this.EspecialistasRef.add({...especialista});
    }

    checkIfLoginEspecialista(name,result){
        return this.getEspecilista(name).snapshotChanges().pipe(map(data => data.map(usr =>{
            this.especialistaLogeado = usr.payload.doc.data()
            if(this.especialistaLogeado != null && this.especialistaLogeado.enabled && result.user.emailVerified){
                IngresoService.iudUserLogged = result.user.uid;
                IngresoService.userNameLogged = name;
                IngresoService.completeName = this.especialistaLogeado.nombre + ' ' + this.especialistaLogeado.apellido;
                this.isLogged = true;
                this.UsuariosRef.add({email:name,logged:Date.now()});
                this.router.navigate(['home']);
            }else{
                throw new Error('Mail no verificado');
            }
        }))).subscribe();
    }

    getAllEspecialistas():AngularFirestoreCollection<Especialistas>{
        return this.EspecialistasRef;
    }

    updateEspecialista(id,enabledAccount){
        console.log('name  '+ id);
        this.db.collection(this.especialistas).doc(id).update({enabled: enabledAccount});
    }
    //Pacientes
    addPaciente(paciente){
        this.PacientesRef.add({...paciente});
    }

    getPaciente(mail):AngularFirestoreCollection<Pacientes>{
        return this.db.collection(this.pacientes,ref => ref.where('mail','==',mail))
    }

    checkIfLoginPaciente(name,result){
        return this.getPaciente(name).snapshotChanges().pipe(map(data =>data.map(usr => {
            this.pacienteLogeado = usr.payload.doc.data()
            if(result.user.emailVerified && this.pacienteLogeado){
                IngresoService.iudUserLogged = result.user.uid;
                IngresoService.userNameLogged = name;
                IngresoService.completeName = this.pacienteLogeado.nombre + ' ' + this.pacienteLogeado.apellido;
                this.isLogged = true;
                this.UsuariosRef.add({email:name,logged:Date.now()});
                this.router.navigate(['home']);
            }else{
                throw new Error('Mail no verificado');
            }
        }))).subscribe();
    }

    getAllPacientes():AngularFirestoreCollection<Pacientes>{
        return this.PacientesRef;
    }

    //Administradores
    addAdministrador(adminsitrador){
        this.AdministradoresRef.add({...adminsitrador});
    }

    getAdministrador(mail):AngularFirestoreCollection<Administradores>{
        return this.db.collection(this.administradores,ref => ref.where('mail','==',mail));
    }

    checkIfLoginAdministrador(name,result){
        return this.getAdministrador(name).snapshotChanges().pipe(map(data => data.map(usr =>{
            this.administradorLogeado = usr.payload.doc.data()
            if(this.administradorLogeado != null){
                IngresoService.iudUserLogged = result.user.uid;
                IngresoService.userNameLogged = name;
                IngresoService.completeName = this.administradorLogeado.nombre + ' ' + this.administradorLogeado.apellido;
                this.isLogged = true;
                this.UsuariosRef.add({email:name,logged:Date.now()});
                this.router.navigate(['home']);
            }else{
                throw new Error('Mail no verificado');
            }
        }))).subscribe();
    }

    logout(){
        
        this.afAuth.signOut().then(() =>{
            this.subscritoP.unsubscribe();
            this.subscritoA.unsubscribe();
            this.subscritoE.unsubscribe();
            this.isLogged = false;
           this.router.navigate(['']);
        });
    }

}
