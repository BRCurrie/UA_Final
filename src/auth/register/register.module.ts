import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// Modules
import { SharedModule } from "../shared/shared.module";

// Components and Containers
import { RegisterComponent } from "./container/register/register.component";

export const ROUTES: Routes = [{ path: "", component: RegisterComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), SharedModule],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
