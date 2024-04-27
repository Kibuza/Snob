import { Component, OnInit } from '@angular/core';
import { PrivadaService } from '../../services/privada.service';

@Component({
  selector: 'app-privada',
  standalone: true,
  imports: [],
  templateUrl: './privada.component.html',
  styleUrl: './privada.component.css'
})
export class PrivadaComponent implements OnInit{

  cositas = [];

  constructor(private privadaService: PrivadaService){};
  
  ngOnInit(): void {
    this.privadaService.getEvents().subscribe({
      next:(value: any) => {
        this.cositas = value;
      },
      error:(error) => {
        console.log(error);
      }
    }
    );
  }
  

}
