import { Component, Input, OnInit } from '@angular/core';
import { PeliculaComponent } from '../pelicula/pelicula.component';
import { ActivatedRoute } from '@angular/router';
import { APITMDBService } from '../../services/api-tmdb.service';
import { ReviewComponent } from '../review/review.component';
import { VentanaEmergenteComponent } from '../../shared/ventana-emergente/ventana-emergente.component';
import { FavoriteComponent } from '../../favorite/favorite.component';

@Component({
  selector: 'app-detalles-pelicula',
  standalone: true,
  imports: [PeliculaComponent, ReviewComponent, VentanaEmergenteComponent, FavoriteComponent],
  templateUrl: './detalles-pelicula.component.html',
  styleUrl: './detalles-pelicula.component.css'
})
export class DetallesPeliculaComponent implements OnInit {

  peliculaId: string = "";
  movie: any;

  constructor(private route: ActivatedRoute, private servicioMovies : APITMDBService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Capturar el ID de la película de los parámetros de la URL
      this.peliculaId = params['id'];
      this.loadMovie(this.peliculaId);
    });
  }

  loadMovie(id:string) {
    this.servicioMovies.getMovieById(id).subscribe({
      next: value => {
        //console.log('La pelicula es: ' , value)
        this.movie = value;
    },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => console.log('Observable emitted the complete notification')
  });
  }
}
