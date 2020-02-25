import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

// shared modules
import { SharedModule } from "./shared/shared.module";

export const ROUTES: Routes = [
  {
    path: "auth",
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      { path: "login", loadChildren: "./login/login.module#LoginModule" },
      {
        path: "register",
        loadChildren: "./register/register.module#RegisterModule"
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBIr0Mi8enCvavhiT5d-_x8J_NX8xkFAkM",
  authDomain: "fitness-app-ua-ffad7.firebaseapp.com",
  databaseURL: "https://fitness-app-ua-ffad7.firebaseio.com",
  projectId: "fitness-app-ua-ffad7",
  storageBucket: "fitness-app-ua-ffad7.appspot.com",
  messagingSenderId: "716655804729"
  // appId: "1:716655804729:web:b1c2c123573d0d2e90e8e8",
  // measurementId: "G-KJ6V9DJGR9"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // This is the invocation of the forRoot static property from our auth service
    SharedModule.forRoot()
  ]
})
export class AuthModule {}
