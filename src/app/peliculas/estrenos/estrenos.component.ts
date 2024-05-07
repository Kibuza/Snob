import { Component, NgModule } from '@angular/core';
import { APITMDBService } from '../../services/api-tmdb.service';
import { PeliculaComponent } from '../pelicula/pelicula.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-estrenos',
  standalone: true,
  imports: [PeliculaComponent],
  templateUrl: './estrenos.component.html',
  styleUrl: './estrenos.component.css'
})
export class EstrenosComponent {

  lista_movies: any[] = [];

  constructor(private servicioMovies: APITMDBService) {}

  ngOnInit(): void {
    // Llamada inicial a la API, puedes hacerla aquí o en otro método según lo que necesites
     this.loadMovies();
  }

  loadMovies() {
    this.servicioMovies.getUpcomingMovies().subscribe({
      next: value => {
        //console.log('Observable emitted the next value: ' , value)
        this.lista_movies = value.results;
        //console.log(this.lista_movies);
    },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => console.log('Observable emitted the complete notification')
  });
  }
}
