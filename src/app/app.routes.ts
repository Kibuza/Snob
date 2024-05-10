import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
//import { AuthGuard } from './auth.guard';
import { DetallesPeliculaComponent } from './peliculas/detalles-pelicula/detalles-pelicula.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EstrenosComponent } from './peliculas/estrenos/estrenos.component';
import { SnobsComponent } from './pages/snobs/snobs.component';
import { ContactoComponent } from './contacto/contacto.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacto', component: ContactoComponent },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'detalles/:id',
    component: DetallesPeliculaComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'estrenos',
    component: EstrenosComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'users',
    component: SnobsComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
];
