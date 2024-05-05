import { Component, Input, OnInit } from '@angular/core';
import { FavoriteForm } from '../interfaces/favorites.interface';
import { UserFService } from '../services/user-f.service';
import { FavoritesService } from '../services/favorites.service';
import { VentanaEmergenteComponent } from '../shared/ventana-emergente/ventana-emergente.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [VentanaEmergenteComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {

  @Input() pelicula: any;
  usuario_actual: any;
  favorite: FavoriteForm = { id_usuario: '', id_peliculas_favoritas: [] };
  mensaje: string = '';
  favorites: any = [];
  hovered = false;

  constructor(
    private authService: UserFService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.usuario_actual = user;
        this.favorite = {
          id_usuario: this.usuario_actual.uid,
          id_peliculas_favoritas: this.pelicula.id,
        };
        this.obtenerFavoritos();
      } else {
        // Maneja el caso en que no haya usuario disponible
      }
    });
  }

  obtenerFavoritos() {
    this.favoriteService.getFavoritesByUser(this.usuario_actual.uid).subscribe((favorites) => {
     //console.log(follows); 
     if(favorites.length > 0){
       this.favorites = favorites[0].id_peliculas_favoritas;
     }
    });
  }

  seguir() {
    this.favoriteService.createFavorite(this.favorite).then(() => {
      this.mensaje = 'Has añadido ' + this.pelicula.title + ' a tus favoritos';
      this.favorites.push(this.pelicula.id);
    });
  }

  dejardeSeguir() {
    this.favoriteService.deleteFavorite(this.favorite).then(() => {
      this.mensaje = 'Has quitado ' + this.pelicula.title + ' de tus favoritos';
      const index = this.favorites.indexOf(this.pelicula.id);
      // Si se encuentra el usuario en el array
      if (index !== -1) {
        // Eliminar el elemento del array usando splice
        this.favorites.splice(index, 1);
      }
    });
  }

}
