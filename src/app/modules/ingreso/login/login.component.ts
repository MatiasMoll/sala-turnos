//import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
//import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
//import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Especialistas } from 'src/app/modelos/especialistas/especialistas';
import { Administradores } from 'src/app/modelos/administradores/administradores';
import { Pacientes } from 'src/app/modelos/pacientes/pacientes';
import { map } from 'rxjs/operators';
//import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public listUsuario:Array<Pacientes> = new Array<Pacientes>();
	public listEspecialistas:Array<Especialistas> = new Array<Especialistas>();
	public listAdmin:Array<Administradores> = new Array<Administradores>();
	ngOnInit() {
	}
 	public usrName:string;
	public usrPass:string;

	constructor(
		public fireAuth:AngularFireAuth,
		public router:Router,
		public authService: IngresoService
	) {
		this.authService.getAllPacientes().snapshotChanges().pipe(
			map(data =>{
				this.listUsuario = [];
				data.map(paciente => {
					this.listUsuario.push(paciente.payload.doc.data());
				})
				if(this.listUsuario.length >= 3){
					this.listUsuario = this.listUsuario.slice(0,3);
				}
			})	
		).subscribe();
		this.authService.getAllEspecialistas().snapshotChanges().pipe(
			map(data =>{
				this.listEspecialistas = [];
				data.map(paciente => {
					this.listEspecialistas.push(paciente.payload.doc.data());
				})
				if(this.listEspecialistas.length >= 3){
					this.listEspecialistas = this.listEspecialistas.slice(0,3);
				}
			})	
		).subscribe();
		this.authService.getAdministrador('matias_travian@hotmail.com').snapshotChanges().pipe(
			map(data =>{
				this.listAdmin = [];
				data.map(paciente => {
					this.listAdmin.push(paciente.payload.doc.data());
				})
				if(this.listAdmin.length >= 3){
					this.listAdmin = this.listAdmin.slice(0,3);
				}
			})	
		).subscribe();


	}

	
	irAlRegistro(){
		this.router.navigate(['/registro']);
	}
	loginWithGoogle(){
		this.authService.GoogleAuth();
	}

	login(){
		try{
			this.authService.loginWithEmailAndPassword(this.usrName,this.usrPass);	
		}catch(error){

		}
		
  	}        
	clearInputs(){
		this.usrName = "";
		this.usrPass = "";
	}
	
	fillInputs(userSelected){
		this.usrName = userSelected.mail;
		this.usrPass = userSelected.pass;
	}

}
