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
import { TablaEspecialidadesComponent } from './components/tabla-especialidades/tabla-especialidades.component';
import { TablaHorariosComponent } from './components/tabla-horarios/tabla-horarios.component';
import { TablaEspecialistasComponent } from './components/tabla-especialistas/tabla-especialistas.component';
import { ChangeFormatDatePipe } from './pipes/change-format-date.pipe';
import { ShowFabButtonsComponent } from './components/show-fab-buttons/show-fab-buttons.component';
import { CrearHistoriaComponent } from './pages/crear-historia/crear-historia.component';
import { MostrarHistoriaComponent } from './components/mostrar-historia/mostrar-historia.component';



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
    FiltroPipe,
    TablaEspecialistasComponent,
    TablaEspecialidadesComponent,
    TablaHorariosComponent,
    ChangeFormatDatePipe,
    CrearHistoriaComponent,
    MostrarHistoriaComponent
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
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
