import { Component, OnInit, inject } from '@angular/core';
import { APITMDBService } from '../../services/api-tmdb.service';
import { BuscadorComponent } from '../../shared/buscador/buscador.component';
import { BusquedaService } from '../../services/busqueda.service';
import { PeliculaComponent } from '../pelicula/pelicula.component';

@Component({
  selector: 'app-lista-peliculas',
  standalone: true,
  imports: [BuscadorComponent, PeliculaComponent],
  template: `
    <div class="flex flex-wrap">
      @for (movie of lista_movies; track $index) {
      <div
        class="flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
      >
        <app-pelicula [movie]="movie"></app-pelicula>
      </div>
      }
    </div>
  `,
  styleUrl: './lista-peliculas.component.css',
})
export class ListaPeliculasComponent implements OnInit {
  lista_movies: any[] = [];

  constructor(
    private servicioMovies: APITMDBService,
    private busquedaService: BusquedaService
  ) {}

  ngOnInit(): void {
    // Llamada inicial a la API, puedes hacerla aquí o en otro método según lo que necesites
    // this.loadMovies('');
    this.busquedaService.terminoBusqueda$.subscribe((termino) => {
      this.loadMovies(termino);
    });
  }

  loadMovies(searchTerm: String) {
    this.servicioMovies.getMovies(searchTerm).subscribe({
      next: (value) => {
        console.log('Observable emitted the next value: ', value);
        this.lista_movies = value.results;
        console.log(this.lista_movies);
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }
}
