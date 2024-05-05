import { Component, Input, OnInit } from '@angular/core';
import { FollowForm } from '../interfaces/follows.interface';
import { VentanaEmergenteComponent } from '../shared/ventana-emergente/ventana-emergente.component';
import { UserFService } from '../services/user-f.service';
import { FollowService } from '../services/follow.service';

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [VentanaEmergenteComponent],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.css',
})
export class FollowComponent implements OnInit {
  @Input() user_seguido: any; //Lo recibo desde el componente donde esté insertado el botón
  usuario_actual: any;
  follow: FollowForm = { id_usuario: '', id_usuarios_seguidos: [] };
  mensaje: string = '';
  seguidos: any = [];
  hovered = false;
  constructor(
    private authService: UserFService,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.usuario_actual = user;
        this.follow = {
          id_usuario: this.usuario_actual.uid,
          id_usuarios_seguidos: this.user_seguido.uid,
        };
        this.obtenerSeguidos();
      } else {
        // Maneja el caso en que no haya usuario disponible
      }
    });
  }

  seguir() {
    this.followService.createFollow(this.follow).then(() => {
      this.mensaje = 'Has seguido a ' + this.user_seguido.username;
      this.seguidos.push(this.user_seguido.uid);
    });
  }

  dejardeSeguir() {
    this.followService.eliminarSeguido(this.follow).then(() => {
      this.mensaje = 'Has dejado de seguir a ' + this.user_seguido.username;
      const index = this.seguidos.indexOf(this.user_seguido.uid);
      // Si se encuentra el usuario en el array
      if (index !== -1) {
        // Eliminar el elemento del array usando splice
        this.seguidos.splice(index, 1);
      }
    });
  }

   obtenerSeguidos() {
     this.followService.getFollowsByUser(this.usuario_actual.uid).subscribe((follows) => {
      //console.log(follows); 
      if(follows.length > 0){
        this.seguidos = follows[0].id_usuarios_seguidos;
      }
     });
   }
}
