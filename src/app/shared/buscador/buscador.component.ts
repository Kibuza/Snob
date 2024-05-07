import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusquedaService } from '../../services/busqueda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  template: `
<div class="flex items-center w-4/5 space-x-3 md:w-full md:space-x-4 mx-4 md:mx-0">
  <input 
    id="busqueda" 
    type="text" 
    [(ngModel)]="searchTerm" 
    (keyup.enter)="onSearch()"
    class=" w-full md:w-full py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    placeholder="Buscar..."
  />
  <button 
    (click)="onSearch()" 
    class="px-4 py-2 text-white bg-botones rounded-md hover:bg-botones-hover focus:outline-none"
  >
    Buscar
  </button>
</div>

  `,
  styleUrl: './buscador.component.css',
})
export class BuscadorComponent {
  searchTerm: string = '';

  constructor(private busquedaService: BusquedaService, private router: Router) {}

  //Al pulsar buscar, va al servicio y actualiza el término de búsqueda, que es de tipo BehaviourSubject, que guarda en un observable el último valor recogido, y lo podré usar desde cualquier otro componente
  onSearch(): void {
    this.busquedaService.actualizarTerminoBusqueda(this.searchTerm);
    this.router.navigateByUrl('/inicio');
  }
}
