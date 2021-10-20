import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IngresoRoutingModule } from './ingreso-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Browser } from 'protractor';
import { RegistroComponent } from './registro/registro.component';
import { ModalAgregarEspecialidadComponent } from './modal-agregar-especialidad/modal-agregar-especialidad.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ModalAgregarEspecialidadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IngresoRoutingModule
  ]
})
export class IngresoModule { }
