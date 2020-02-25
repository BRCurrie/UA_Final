import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

// service
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "login",
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">Login</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </auth-form>
    </div>
  `
})
export class LoginComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  async loginUser(event: FormGroup) {
    // console.log(event.value);
    // destructure
    const { email, password } = event.value;
    // we get a promise back from the AngularFireAuth function in the service.
    // try/catch added to help with error handling
    try {
      await this.authService.loginUser(email, password);
      // promise is done, it has come back with this information.
      // we want to navigate to the homepage after login.
      this.router.navigate(["/"]);
    } catch (err) {
      // we need to display any errors in our form
      this.error = err.message;
    }
  }
}
