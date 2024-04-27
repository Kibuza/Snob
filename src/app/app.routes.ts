import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth.guard';
import { PrivadaComponent } from './pages/privada/privada.component';
import { DetallesPeliculaComponent } from './peliculas/detalles-pelicula/detalles-pelicula.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'privada', component: PrivadaComponent },
  { path: 'detalles/:id', component: DetallesPeliculaComponent },
];
