import { Component, Input } from '@angular/core';
import { ReviewService } from '../../services/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { reviewRequest } from './reviewRequest';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/token-auth.service';
import { forkJoin } from 'rxjs';
import { FollowComponent } from '../../follow/follow.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [NgIf, FollowComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  @Input() movie: any = 0;
  isLoading: boolean = true;
  reviews: any[] = [];
  mi_review: any = [];
  user: any;
  isAdmin: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        if(this.user.rol=='ADMIN_ROLE'){
          this.isAdmin = true;
        }
        this.getReviews(this.movie.id);
      } else {
        // Maneja el caso en que no haya usuario disponible
      }
    });
  }

  //Le paso el id de la película y el texto escrito en el textarea para el servicio de registro
  registerReview(text: any) {
    const id_pelicula = this.movie.id;
    this.authService.getUser().subscribe((user) => {
      if (user) {
        const id_usuario = user._id;
        const review: reviewRequest = { text, id_pelicula, id_usuario };
        this.reviewService.registerReview(review).subscribe({
          next: (reviewData) => {
            console.log('Este es el next del review');
            console.log(reviewData);
          },
          error: (errorData) => {
            console.error(errorData);
          },
          complete: () => {
            console.info('Registrada la review con éxito');
            this.reviews = [];
            this.getReviews(id_pelicula);
          },
        });
        // Aquí puedes usar el objeto review
      } else {
        // Maneja el caso en que no haya usuario disponible
      }
    });
    //Creo la variable review con text e id_pelicula e id_usuario
  }

  //Cargo la lista entera de reviews de la película (por id de película)
  getReviews(id: number) {
    this.reviewService.getReviews(id).subscribe({
      next: (reviewData) => {
        console.log('esto es el next del cargar reviews');
        console.log(reviewData);
        const review_users = reviewData.map(
          (
            review: any // Crea un array con los usuarios de las reviews
          ) => this.authService.getUserInfo(review.id_usuario)
        );
        
        forkJoin(review_users).subscribe((users: any) => {
          reviewData.forEach((review: any, index: number) => {
            // Carga cada review con el usuario correspondiente
            review.user = users[index];   
            if (this.user && review.id_usuario === this.user._id) {
              this.mi_review = review;
            } else {
              this.reviews.push(review);
            }
          });
        });          
      },
      
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        this.isLoading = false;
        console.info('Reviews cargadas');
        
      },
    });
  }

  eliminar(review_id : string) {
    this.reviewService
      .deleteReview(review_id)
      .subscribe((reviewData) => {
        console.log('Reseña eliminada con exito');
        this.mi_review= [];
        this.reviews = [];
        this.getReviews(this.movie.id);
      });
  }
}
