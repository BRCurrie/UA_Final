import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

// service
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "register",
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit">Create Account</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {
  //We only need a string here, firebase will pass us an error message. We will update this
  // property with the message.
  error: string;

  constructor(
    // dependency inject service because this is a smart component
    private authService: AuthService,
    private router: Router
  ) {}
  // we can mark this as async and then we will await for the promise to finish resolving
  async registerUser(event: FormGroup) {
    // console.log(event.value);
    // destructure
    const { email, password } = event.value;
    // we get a promise back from the AngularFireAuth function in the service.
    // try/catch added to help with error handling
    try {
      await this.authService.createUser(email, password);
      // promise is done, it has come back with this information.
      // we want to navigate to the homepage after login.
      this.router.navigate(["/"]);
    } catch (err) {
      // we need to display any errors in our form
      this.error = err.message;
    }
  }
}
