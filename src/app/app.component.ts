import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaPeliculasComponent } from './peliculas/lista-peliculas/lista-peliculas.component';
import { CabeceraComponent } from './shared/cabecera/cabecera.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { VentanaEmergenteComponent } from './shared/ventana-emergente/ventana-emergente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaPeliculasComponent, CabeceraComponent, FooterComponent, MainComponent, VentanaEmergenteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Snob';
}
