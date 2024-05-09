import { Component, OnInit } from '@angular/core';
import { BuscadorComponent } from '../buscador/buscador.component';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { BusquedaService } from '../../services/busqueda.service';
import { UserFService } from '../../services/user-f.service';

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

  constructor(
    private busquedaService: BusquedaService,
    private authService : UserFService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.usuario = user;
        //console.log(this.usuario);
        this.usuarioLogeado = true;
      }
    })
  }

  abrirNav() {
    var menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
    if (!menu.classList.contains("hidden")) {
      var buttonRect = document.getElementById("menuBtn").getBoundingClientRect();
      menu.style.top = buttonRect.bottom + 20 + "px";
      menu.style.left = buttonRect.left - 40 + "px";
    }
  }

  closeSearch(){
    this.busquedaService.actualizarTerminoBusqueda("");
  }
}
