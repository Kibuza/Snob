import { Component, OnInit } from '@angular/core';
import { FollowComponent } from '../../follow/follow.component';
import { UserFService } from '../../services/user-f.service';

@Component({
  selector: 'app-snobs',
  standalone: true,
  imports: [FollowComponent],
  templateUrl: './snobs.component.html',
  styleUrl: './snobs.component.css'
})
export class SnobsComponent implements OnInit {

  user: any;
  server: string = '';
  usuarios: any[] = [];

  constructor(private authService: UserFService) { }
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    })
    this.getUsers();
  }

   getUsers() {
     this.authService.getUsers().subscribe((users: any) => {
      users.forEach(element => {
        if(element.uid == this.user.uid){
          users.splice(users.indexOf(element), 1);
        }
      });
       this.usuarios = users;
     });
   }
}
