import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoRoutingModule } from './ingreso-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { ModalAgregarEspecialidadComponent } from './modal-agregar-especialidad/modal-agregar-especialidad.component';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { MatButtonModule } from '@angular/material/button';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


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
    RecaptchaModule,
    RecaptchaFormsModule,
    MatButtonModule,
    IngresoRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers:[
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey:'6Lf1wOIcAAAAAL4DzTbtL9w6CFZxhWGYVX8RYAiJ'}
    }
  ]
})
export class IngresoModule { }
