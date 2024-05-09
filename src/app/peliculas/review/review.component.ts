import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { firstValueFrom, forkJoin } from 'rxjs';
import { FollowComponent } from '../../follow/follow.component';
import { ReviewsFService } from '../../services/reviews-f.service';
import { ReviewForm } from '../../interfaces/reviews.interface';
import { UserFService } from '../../services/user-f.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [NgIf, FollowComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  @Input() movie: any = 0;
  server: string = '';
  isLoading: boolean = true;
  reviews: any[] = [];
  mi_review: any = [];
  user: any;
  user_bd: any;
  isAdmin: boolean = false;

  constructor(
    private authService: UserFService,
    private reviewsFService: ReviewsFService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.authService.getUser(user.uid).then((user_bd) => {
          this.user_bd = user_bd;
          if (this.user_bd.rol == 'ADMIN_ROLE') {
            this.isAdmin = true;
          }
        })
        this.getReviews(this.movie.id);
      } else {
        // Maneja el caso en que no haya usuario disponible
      }
    });
  }

  // async getReviews(id:string){
  //   return await this.reviewsFService.getReviewsByMovie(id);
  // }

  async getReviews(id: string) {
    try {
      const reviewData = await this.reviewsFService.getReviewsByMovie(id);
      // Array de promesas para obtener los usuarios de todas las revisiones
      const getUserPromises = reviewData.map((review) =>
        this.getUser(review.id_usuario)
      );
      // Espera a que todas las promesas de obtención de usuarios se resuelvan
      const users = await Promise.all(getUserPromises);

      // Introduce los usuarios en las revisiones correspondientes
      reviewData.forEach((review, index) => {
        const user = users[index]; // Obtiene el usuario correspondiente
        review.usuario = user; // Introduce el usuario en la revisión
        if (this.user && review.id_usuario === this.user.uid) {
          this.mi_review = review;
        } else {
          this.reviews.push(review);
        }
      });
      //console.log(this.reviews);
      this.isLoading = false;
      //console.info('Reviews cargadas');
    } catch (errorData) {
      console.error(errorData);
    }
  }

  registerReview(text: any) {
    this.authService.user$.subscribe(async (user) => {
      if (user) {
        const id_pelicula = this.movie.id;
        const id_usuario = user.uid;
        const review: ReviewForm = { id_usuario, id_pelicula, text };
        try {
          await this.reviewsFService.createReview(review);
          this.reviews = [];
          this.getReviews(this.movie.id);
        } catch (error) {
          console.error(error);
        }
      } else {
        // Maneja el caso en que no haya usuario disponible
      }
    });
  }

  async deleteReview(review_id: string) {
    try {
      await this.reviewsFService.deleteReview(review_id);
      this.reviews = [];
      this.mi_review = [];
      await this.getReviews(this.movie.id);
    } catch (error) {
      console.error('Error al eliminar la revisión:', error);
    }
  }

  async getUser(id: string) {
    return await this.authService.getUser(id);
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
}
