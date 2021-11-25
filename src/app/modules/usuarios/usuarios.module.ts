import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { HomeUsComponent } from './pages/home-us/home-us.component';
import { AppModule } from 'src/app/app.module';
import { MostrarHistoriaComponent } from './components/mostrar-historia/mostrar-historia.component';
import { CardTurnoComponent } from './components/card-turno/card-turno.component';
import { ChangeTimespanPipe } from 'src/app/modules/usuarios/pipes/change-timespan.pipe';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    HomeUsComponent,
    MostrarHistoriaComponent,
    CardTurnoComponent,
    ChangeTimespanPipe
    
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
