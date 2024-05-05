import { Component } from '@angular/core';
import { Observable, forkJoin, from, map, mergeMap, switchMap } from 'rxjs';
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
      //console.log(follows);
      if (follows.length > 0) {
        const seguidos = follows[0].id_usuarios_seguidos;
        console.log('1: seguidos');
        console.log(seguidos);
        //Ahora voy a llamar a las reviews escritas por los seguidos
        seguidos.forEach((id_Seguido) => {
          console.log('2. cada seguido:');
          this.authService.getUser(id_Seguido).then((user) => {
            console.log(user);
            this.reviewService.getReviewsByUserId(id_Seguido).then((review) => {
              review.forEach((review) => {
                this.movieService.getMovieById(review.id_pelicula).subscribe(
                  (movie) => {
                    review.pelicula = movie;
                    review.usuario = user;
                    this.reviews.push(review);
                    console.log(review);
                  }
                )
              });
            });
          });
        });
      }
    });
  }

  filtrarReviews() {
    this.reviews_filtradas = this.reviews;
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
