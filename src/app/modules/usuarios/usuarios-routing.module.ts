import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUsComponent } from './pages/home-us/home-us.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {path:'',redirectTo:'homeUsuario',pathMatch:'full'},
  {path:'homeUsuario',component:HomeUsComponent},
  {path:'listaUsuarios/:isEspecialista',component:ListaUsuariosComponent},
  {path:'**',redirectTo:'homeUsuario',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
