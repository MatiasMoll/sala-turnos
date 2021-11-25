import { isLocalRelativePath } from '@angular/compiler-cli/src/ngtsc/file_system';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedAdminGuard } from './guards/is-logged-admin.guard';
import { IsLoggedUserGuard } from './guards/is-logged-user.guard';
import { IngresoModule } from './modules/ingreso/ingreso.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AltaTurnoComponent } from './pages/alta-turno/alta-turno.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { HomeComponent } from './pages/home/home.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';

const routes: Routes = [
  {path:'',redirectTo:'bienvenido',pathMatch:'full'},
  {path:'bienvenido',component:BienvenidoComponent,data:{animation: 'BienvenidoPage'}},
  {path:'home',component:HomeComponent,canActivate:[IsLoggedUserGuard],data:{animation: 'HomePage'}},
  {path:'mis-turnos',component:MisTurnosComponent},
  {path:'pacientes',component:PacientesComponent},
  {path:'miPerfil',component:MiPerfilComponent,canActivate:[IsLoggedUserGuard],data:{animation: 'MiPerfilPage'}},
  {path:'estadisticas',component:EstadisticasComponent,canActivate:[IsLoggedAdminGuard]},
  {path:'altaTurno',component:AltaTurnoComponent, data:{animation: 'AltaTurnoPage'}},
  {path:'ingreso',loadChildren: () => import('./modules/ingreso/ingreso.module').then(m => IngresoModule) },
  {path:'usuarios',loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => UsuariosModule),canActivate:[IsLoggedAdminGuard] },
  {path:'**',redirectTo:'bienvenido',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
