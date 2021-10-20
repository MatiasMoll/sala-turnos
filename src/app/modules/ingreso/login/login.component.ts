//import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
//import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
//import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { IngresoService } from 'src/app/services/ingreso/ingreso.service';
import { AngularFireAuth } from '@angular/fire/auth';
//import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	ngOnInit() {
	}
 	public usrName:string;
	public usrPass:string;

	constructor(
		public fireAuth:AngularFireAuth,
		public router:Router,
		public authService: IngresoService
	) {

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
	
	fillInputs(name,pass){
		this.usrName = name;
		this.usrPass = pass;
	}

}
