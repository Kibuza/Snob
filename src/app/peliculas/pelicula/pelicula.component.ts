import { Component, Input } from '@angular/core';
import { ListaPeliculasComponent } from '../lista-peliculas/lista-peliculas.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [ListaPeliculasComponent, RouterLink],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent {

  @Input() movie : any;
}
