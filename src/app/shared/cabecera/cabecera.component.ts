import { Component, OnInit } from '@angular/core';
import { BuscadorComponent } from '../buscador/buscador.component';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { AuthService } from '../../services/auth/token-auth.service';
import { ServerURLService } from '../../services/server-url.service';
import { NgIf } from '@angular/common';
import { BusquedaService } from '../../services/busqueda.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [BuscadorComponent, RouterLink, NgIf],
  templateUrl:'./cabecera.component.html',
  styleUrl: './cabecera.component.css',
})
export class CabeceraComponent implements OnInit {
  usuarioLogeado: boolean = false;
  usuario: any | null = null;
  server: string = this.serverUrl.getServerUrl();

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private serverUrl: ServerURLService,
    private busquedaService: BusquedaService
  ) {}

  ngOnInit(): void {
    this.loginService.loggedIn().subscribe((logeado: boolean) => {
      if (logeado) {
        this.authService.getActualUser().subscribe((data) => {
          if (data) {
            this.usuario = data;
            this.authService.setUser(data);
            this.usuarioLogeado = logeado;
          }
        });
      }
    });
  }
  logoutUser() {
    localStorage.removeItem('token');
  }

  closeSearch(){
    this.busquedaService.actualizarTerminoBusqueda("");
  }
}
