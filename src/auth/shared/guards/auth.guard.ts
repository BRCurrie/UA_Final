import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import "rxjs/add/operator/map";

import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    // we need to return a boolean, and we can use auth.service
    return this.authService.authState.map(user => {
      // if they are not authenticated we want to send them to the login
      if (!user) {
        // the result recieved was a null result
        this.router.navigate(["/auth/login"]);
      } // double bang (!!) converts to a boolean, user object is true, null is false
      return !!user;
    });
  }
}
