import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';
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
import { CardTurnoComponent } from './components/card-turno/card-turno.component';
import { AltaTurnoComponent } from './pages/alta-turno/alta-turno.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FiltroPipe } from './pipes/filtro.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    WhichRegisterComponent,
    HomeComponent,
    NavbarComponent,
    MisTurnosComponent,
    CardTurnoComponent,
    AltaTurnoComponent,
    MiPerfilComponent,
    FiltroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IngresoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
