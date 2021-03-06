import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { Store } from "store";

// feature modules
import { AuthModule } from "../auth/auth.module";

// containers
import { AppComponent } from "./containers/app/app.component";

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), AuthModule],
  declarations: [AppComponent],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}

// https://fitness-app-ua-ffad7.firebaseapp.com

// const firebaseConfig = {
//   apiKey: "AIzaSyBIr0Mi8enCvavhiT5d-_x8J_NX8xkFAkM",
//   authDomain: "fitness-app-ua-ffad7.firebaseapp.com",
//   databaseURL: "https://fitness-app-ua-ffad7.firebaseio.com",
//   projectId: "fitness-app-ua-ffad7",
//   storageBucket: "fitness-app-ua-ffad7.appspot.com",
//   messagingSenderId: "716655804729",
//   appId: "1:716655804729:web:b1c2c123573d0d2e90e8e8",
//   measurementId: "G-KJ6V9DJGR9"
// };
