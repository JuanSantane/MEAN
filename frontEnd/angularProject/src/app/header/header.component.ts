import { Component, OnInit } from '@angular/core'; // EventEmitter, Output
import { Response } from '@angular/http';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  styleUrls: ['./header.component.css'],
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  userLogged: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.newUserLogged.subscribe(
      (user: User) => {
        this.userLogged = user;
      }
    );
  }

  logout() {
    this.userLogged = null;
    this.userService.logout();
  }

}
