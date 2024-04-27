import { Component, OnInit } from '@angular/core';
import { ListaPeliculasComponent } from '../../peliculas/lista-peliculas/lista-peliculas.component';
import { TrendingPelisComponent } from '../../peliculas/trending-pelis/trending-pelis.component';
import { ReviewsSeguidosComponent } from '../../peliculas/reviews-seguidos/reviews-seguidos.component';
import { BusquedaService } from '../../services/busqueda.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ListaPeliculasComponent, TrendingPelisComponent, ReviewsSeguidosComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  constructor(private busquedaService: BusquedaService) { }

  checker = false;
  ngOnInit(): void {
    // Suscripción al BehaviorSubject
    this.busquedaService.terminoBusqueda$.subscribe(termino => {
      if (termino.trim() === '') {
        this.checker = false;
        console.log('El término de búsqueda está vacío');
      } else {
        this.checker = true;
      }
    });
  }

}
