import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// Modules
import { SharedModule } from "../shared/shared.module";

// Components and Containers
import { LoginComponent } from "./containers/login/login.component";

export const ROUTES: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), SharedModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
