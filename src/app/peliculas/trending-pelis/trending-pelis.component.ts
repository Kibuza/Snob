import { Component } from '@angular/core';
import { APITMDBService } from '../../services/api-tmdb.service';
import { PeliculaComponent } from '../pelicula/pelicula.component';

@Component({
  selector: 'app-trending-pelis',
  standalone: true,
  imports: [PeliculaComponent],
  templateUrl: './trending-pelis.component.html',
  styleUrl: './trending-pelis.component.css'
})
export class TrendingPelisComponent {
  lista_movies: any[] = [];

  constructor(private servicioMovies: APITMDBService) {}

  ngOnInit(): void {
    // Llamada inicial a la API, puedes hacerla aquí o en otro método según lo que necesites
     this.loadMovies();
  }

  loadMovies() {
    this.servicioMovies.getTrendingMovies().subscribe({
      next: value => {
        console.log('Observable emitted the next value: ' , value)
        this.lista_movies = value.results;
        console.log(this.lista_movies);
    },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => console.log('Observable emitted the complete notification')
  });
  }
}
