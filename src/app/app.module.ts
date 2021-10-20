import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresoModule } from './modules/ingreso/ingreso.module';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { WhichRegisterComponent } from './components/which-register/which-register.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';



@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    WhichRegisterComponent,
    HomeComponent,
    NavbarComponent,
    MisTurnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IngresoModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
