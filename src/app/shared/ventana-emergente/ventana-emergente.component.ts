import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ventana-emergente',
  standalone: true,
  imports: [],
  templateUrl: './ventana-emergente.component.html',
  styleUrl: './ventana-emergente.component.css'
})
export class VentanaEmergenteComponent implements OnInit {

  @Input() mensaje: string = "";
  mostrarVentana: boolean = false;

  constructor(){}

  ngOnInit(): void {
    // Puedes mantener esto vacío ya que no necesitas inicializar nada aquí.
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mensaje'] && changes['mensaje'].currentValue) {
      this.mostrarVentana = true;
      setTimeout(() => {
        this.mostrarVentana = false;
      }, 2000);
    }
  }


}
