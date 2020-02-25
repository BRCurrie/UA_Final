import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "auth-form",
  styleUrls: ["auth-form.component.scss"],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <!-- Content projection will allows to pass content through the form -->
        <ng-content select="h1"></ng-content>
        <label>
          <input
            type="email"
            placeholder="Email address"
            formControlName="email"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Enter Password"
            formControlName="password"
          />
        </label>

        <!-- We do not call the function, we just need the property -->
        <div class="error" *ngIf="emailFormat">Invalid email format</div>
        <div class="error" *ngIf="passwordInvalid">Password is required</div>

        <ng-content select=".error"></ng-content>

        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>
        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `
})
export class AuthFormComponent {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ["", Validators.email],
    password: ["", Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  // public method which will emit an event back up to parent component
  onSubmit() {
    //check if form is valid
    if (this.form.valid) {
      //emit
      this.submitted.emit(this.form);
    }
  }

  //Validation
  get passwordInvalid() {
    const control = this.form.get("password");
    // use required validator and only show after the field has been interacted with
    return control.hasError("required") && control.touched;
  }

  get emailFormat() {
    const control = this.form.get("email");
    // use email validator and only show after the field has been interacted with
    return control.hasError("email") && control.touched;
  }
}
