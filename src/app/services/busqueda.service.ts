import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  
    private terminoBusqueda: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
    public get terminoBusqueda$(): Observable<string> {
      return this.terminoBusqueda.asObservable();
    }
  
    public actualizarTerminoBusqueda(termino: string): void {
      this.terminoBusqueda.next(termino);
    }
  constructor() { }
}
