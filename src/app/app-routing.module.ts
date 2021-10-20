import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedAdminGuard } from './guards/is-logged-admin.guard';
import { IsLoggedUserGuard } from './guards/is-logged-user.guard';
import { IngresoModule } from './modules/ingreso/ingreso.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
 
  {path:'bienvenido',component:BienvenidoComponent},
  {path:'home',component:HomeComponent,canActivate:[IsLoggedUserGuard]},
  {path:'ingreso',loadChildren: () => import('./modules/ingreso/ingreso.module').then(m => IngresoModule) },
  {path:'usuarios',loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => UsuariosModule),canActivate:[IsLoggedAdminGuard] },
  {path:'**',redirectTo:'bienvenido',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
