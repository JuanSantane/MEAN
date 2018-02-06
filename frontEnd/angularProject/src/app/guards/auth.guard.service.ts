import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {};
    canActivate() {
        console.log("Cheking if an user is logged");
        if (this.userService.isLogged()) {
          return true;
        } else {
          window.alert("You don't have permission to view this page");
          this.router.navigate(['/auth/signin']);
          return false;
        }
      }
}
