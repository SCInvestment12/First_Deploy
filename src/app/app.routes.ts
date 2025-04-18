import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/acceso/login-page/login-page.component';
import { RegisterPageComponent } from './pages/acceso/register-page/register-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HomeComponent } from './components/home/home.component';
import { ListarPageComponent } from './pages/listar/listar-page/listar-page.component';
import { BuscarPageComponent } from './pages/buscar/buscar-page/buscar-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'listar', component: ListarPageComponent },
  { path: 'buscar', component: BuscarPageComponent },
  { path: '**', component: NotFoundComponent }
];

