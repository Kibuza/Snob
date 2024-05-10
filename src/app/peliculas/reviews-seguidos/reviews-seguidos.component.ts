import { Component } from '@angular/core';
import { Observable, forkJoin, from, map, mergeMap, switchMap, firstValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';
import { APITMDBService } from '../../services/api-tmdb.service';
import { RouterLink } from '@angular/router';
import { UserFService } from '../../services/user-f.service';
import { FollowService } from '../../services/follow.service';
import { ReviewsFService } from '../../services/reviews-f.service';

@Component({
  selector: 'app-reviews-seguidos',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './reviews-seguidos.component.html',
  styleUrl: './reviews-seguidos.component.css',
})
export class ReviewsSeguidosComponent {
  server: string = '';
  user: any = [];
  seguidos: any = []; //Todos los usuarios a los que sigue este usuario
  reviews: any = [];
  reviews_filtradas: any = [];

  constructor(
    private authService: UserFService,
    private movieService: APITMDBService,
    private followService: FollowService,
    private reviewService: ReviewsFService
  ) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user; // Asigna el usuario obtenido
        this.obtenerSeguidos();
        this.filtrarReviews();
      }
    });
  }

  obtenerSeguidos() {
    this.followService.getFollowsByUser(this.user.uid).subscribe((follows) => {
      if (follows.length > 0) {
        const seguidos = follows[0].id_usuarios_seguidos;
        const promises = seguidos.map(id_Seguido => {
          return this.authService.getUser(id_Seguido).then(user => {
            return this.reviewService.getReviewsByUserId(id_Seguido).then(reviews => {
              return Promise.all(reviews.map(review => {
                return firstValueFrom(this.movieService.getMovieById(review.id_pelicula)).then(movie => {
                  review.pelicula = movie;
                  review.usuario = user;
                  this.reviews.push(review);
                });
              }));
            });
          });
        });
        // Esperar a que todas las promesas se resuelvan
        Promise.all(promises).then(() => {
          this.filtrarReviews();
        });
      }
    });
  }
  

  filtrarReviews() {
    // Ordenar el array reviews por su atributo fecha
    this.reviews.sort((a, b) => b.fecha.seconds - a.fecha.seconds || b.fecha.nanoseconds - a.fecha.nanoseconds);
    
    // Asignar el array ordenado a reviews_filtradas
    this.reviews_filtradas = this.reviews;
  }
  

  fechaFormateada(fecha: any) {
    const date = fecha.toDate(); // Convertir Timestamp a Date

    // Formatear la fecha en un formato legible
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDate = date.toLocaleDateString('es-ES', options);

    return formattedDate;
  }

  mostrarMas() {
    var parrafo = document.getElementById('texto');
    if (parrafo) {
      var lineas = parrafo.innerHTML.split('<br>').length; // Divide el texto en líneas basadas en las etiquetas <br>
      return lineas;
    }
    return 0;
  }
}
