import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

//components
import { AuthFormComponent } from "./components/auth-form/auth-form.component";

// services
import { AuthService } from "./services/auth/auth.service";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent]
})
export class SharedModule {
  // We create a property to avoid duplicate instances
  // See shared module for invocation.
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // This is done here because it would be called twice from NgModule decorator
        AuthService
      ]
    };
  }
}
