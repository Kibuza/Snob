import { Component, Input, OnInit } from '@angular/core';
import { FollowService } from '../services/follow.service';
import { AuthService } from '../services/auth/token-auth.service';
import { followRequest } from './followRequest';

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.css'
})
export class FollowComponent implements OnInit {

  @Input() user: any;
  usuario_actual: any;
  follow : followRequest = { id_usuario : "", id_usuario_seguido: "" };
  constructor(private followService: FollowService, private authService: AuthService) {}

  ngOnInit(): void {

    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.usuario_actual = user;
        this.follow = { id_usuario : user._id, id_usuario_seguido: this.user._id };
      } else {
        // Maneja el caso en que no haya usuario disponible
      }
    });
  }
  seguir(){
    this.followService.newFollow(this.follow).subscribe((follows) => {
      console.log(follows);
    });
  }

}
