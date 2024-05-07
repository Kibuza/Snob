import { Component, Input, OnInit } from '@angular/core';
//import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { forkJoin } from 'rxjs';
import { UserFService } from '../../services/user-f.service';
import { StorageComponent } from '../../storage/storage.component';
import { FollowService } from '../../services/follow.service';
import { FollowForm } from '../../interfaces/follows.interface';
import { FavoritesService } from '../../services/favorites.service';
import { APITMDBService } from '../../services/api-tmdb.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [StorageComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  server : string = '';
  user : any = [];
  seguidos : any = [];
  favorites : any = [];
  startIndex: number = 0;

  constructor(private authService : UserFService, private followService : FollowService, private favoriteService : FavoritesService, private movieService : APITMDBService){}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.obtenerSeguidos();
        this.obtenerFavoritos();
      }
    })
  }

   obtenerSeguidos() {
    this.followService.getFollowsByUser(this.user.uid).subscribe((follows) => {
       const seguidos = follows[0].id_usuarios_seguidos;

      // Crear un array de observables para las llamadas asincrónicas
       const observables = seguidos.map((usuario: string) => {
         return this.authService.getUser(usuario);
       });
       // Esperar a que todas las llamadas asincrónicas se completen
       forkJoin(observables).subscribe((users) => {
         this.seguidos = users;
       });
     });
   }
  

   dejardeSeguir(usuario_seguido: any) {
    const follow = {
      id_usuario: this.user.uid,
      id_usuarios_seguidos: usuario_seguido.uid,
    };
     this.followService.eliminarSeguido(follow).then((follows) => {      
       // Buscar el índice del usuario en el array seguidos
       const index = this.seguidos.indexOf(usuario_seguido);
       // Si se encuentra el usuario en el array
       if (index !== -1) {
         // Eliminar el elemento del array usando splice
         this.seguidos.splice(index, 1);
       }
     });
   }

   obtenerFavoritos() {
    this.favoriteService.getFavoritesByUser(this.user.uid).subscribe((favorites) => {
      if (favorites.length > 0) {
        const favorites_ids = favorites[0].id_peliculas_favoritas;
        favorites_ids.forEach(element => {
          this.movieService.getMovieById(element).subscribe((movie) => {
            this.favorites.push(movie);
          })
        });
      }

    });
   }

   quitarFavorito(pelicula: any) {
    const favorito = {
      id_usuario: this.user.uid,
      id_peliculas_favoritas: pelicula.id};

     this.favoriteService.deleteFavorite(favorito).then((favorites) => {      
       // Buscar el índice del usuario en el array seguidos
       const index = this.favorites.indexOf(pelicula);
       // Si se encuentra el usuario en el array
       if (index !== -1) {
         // Eliminar el elemento del array usando splice
         this.favorites.splice(index, 1);
       }
     });
   }

   mostrarMas() {
    this.startIndex += 6; // Aumentar el índice inicial para mostrar las siguientes 6 películas
  }

  // Función de seguimiento para ngFor
  trackFn(index: number, item: any) {
    return index; // o algún identificador único del item si lo tienes
  }

  logoutUser() {
    this.authService.logout();
  }

}
