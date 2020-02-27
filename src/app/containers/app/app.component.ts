import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { Store } from "store";

import {
  AuthService,
  User
} from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: "app-root",
  styleUrls: ["app.component.scss"],
  template: `
    <div>
      <app-header [user]="user$ | async" (logout)="onLogout()"> </app-header>
      <app-nav *ngIf="(user$ | async)?.authenticated"> </app-nav>

      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subcription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // access the observable we setup from the service
    this.subcription = this.authService.auth$.subscribe();
    // reactive approach to select user from store.
    this.user$ = this.store.select<User>("user");
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  async onLogout() {
    await this.authService.logoutUser();
    // redirect back to login after this runs.
    this.router.navigate(["/auth/login"]);
  }
}
