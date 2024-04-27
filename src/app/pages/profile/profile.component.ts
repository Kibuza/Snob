import { Component, Input, OnInit } from '@angular/core';
import { CabeceraComponent } from '../../shared/cabecera/cabecera.component';
import { AuthService } from '../../services/auth/token-auth.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { ServerURLService } from '../../services/server-url.service';
import { FollowService } from '../../services/follow.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CabeceraComponent, UploadFilesComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  server : string = '';
  user : any = [];
  seguidos : any = [];

  constructor(private authService : AuthService, private serverUrl : ServerURLService, private followService : FollowService){}
  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user; // Asigna el usuario obtenido
        this.obtenerSeguidos();
      }
    });
   this.server = this.serverUrl.getServerUrl();
  }

  obtenerSeguidos() {
    this.followService.getFollows(this.user._id).subscribe((follows) => {
      const seguidos = follows[0].follows;
      console.log(seguidos);
  
      // Crear un array de observables para las llamadas asincrónicas
      const observables = seguidos.map((usuario: string) => {
        return this.authService.getUserInfo(usuario);
      });
  
      // Esperar a que todas las llamadas asincrónicas se completen
      forkJoin(observables).subscribe((users) => {
        this.seguidos = users;
        console.log(this.seguidos);
      });
    });
  }

}
