import { Component } from '@angular/core';
import { ListaPeliculasComponent } from '../../peliculas/lista-peliculas/lista-peliculas.component';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ListaPeliculasComponent, RouterModule],
  template: `
  <div class="pt-20">
  <router-outlet/>
  </div>    
  `,
  styleUrl: './main.component.css'
})
export class MainComponent {

}
