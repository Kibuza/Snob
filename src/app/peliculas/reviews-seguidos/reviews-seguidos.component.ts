import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/token-auth.service';
import { ServerURLService } from '../../services/server-url.service';
import { FollowService } from '../../services/follow.service';
import { Observable, forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { ReviewService } from '../../services/reviews.service';
import { NgIf } from '@angular/common';
import { APITMDBService } from '../../services/api-tmdb.service';
import { RouterLink } from '@angular/router';

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
    private authService: AuthService,
    private serverUrl: ServerURLService,
    private followService: FollowService,
    private reviewService: ReviewService,
    private movieService: APITMDBService
  ) {}
  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user; // Asigna el usuario obtenido
        this.obtenerSeguidos();
      }
    });
    this.server = this.serverUrl.getServerUrl();
  }

  obtenerSeguidos() {
    this.followService.getFollows(this.user._id).subscribe((follows) => {
      const seguidos = follows[0].follows;

      // Crear un array de observables para las llamadas asincrónicas
      const observables = seguidos.map((usuario: string) => {
        return this.getReviewsObservable(usuario);
      });

      // Esperar a que todas las llamadas asincrónicas se completen
      forkJoin(observables).subscribe((usersReviews: any) => {
        this.reviews = usersReviews;
        console.log(this.reviews);

        // Flattening usersReviews into one array of reviews
        this.reviews_filtradas = usersReviews.reduce(
          (acc: any[], user: any) => {
            // Transformar cada revisión para que incluya el atributo user
            const reviewsWithUser = user.reviews.map((review: any) => {
              return {
                user: user.user, // Incluir el atributo user
                review: review, // Mantener la revisión original
              };
            });
            // Concatenar las revisiones transformadas al acumulador
            return acc.concat(reviewsWithUser);
          },
          []
        );
        // Ordenar el array reviews_filtradas en base al atributo createdAt de cada revisión
        this.reviews_filtradas.sort((a: any, b: any) => {
          // Convertir las fechas a objetos Date para poder compararlas
          const dateA: Date = new Date(a.review.createdAt);
          const dateB: Date = new Date(b.review.createdAt);
          // Comparar las fechas y devolver el resultado de la comparación
          return dateB.getTime() - dateA.getTime();
        });
        console.log(this.reviews_filtradas);
      });
    });
  }
  getReviewsObservable(userId: string): Observable<any> {
    return this.authService.getUserInfo(userId).pipe(
      switchMap((user) => {
        return this.reviewService.getReviewByUserId(userId).pipe(
          mergeMap((reviews) => {
            // Obtener los datos de la película para cada revisión
            const movieObservables = reviews.map((review: any) => {
              return this.movieService.getMovieById(review.id_pelicula).pipe(
                map((movieData) => {
                  return { ...review, movie: movieData }; // Incluir los datos de la película en la revisión
                })
              );
            });
            // Esperar a que todas las llamadas asincrónicas de obtener datos de la película se completen
            return forkJoin(movieObservables).pipe(
              map((reviewsWithMovie) => {
                return { user, reviews: reviewsWithMovie }; // Devuelve un objeto que contiene tanto el usuario como sus reviews con datos de la película
              })
            );
          })
        );
      })
    );
  }
  
}
