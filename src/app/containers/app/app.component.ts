import { Component, OnInit, OnDestroy } from "@angular/core";

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
      <h1>{{ user$ | async | json }}</h1>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subcription: Subscription;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    // access the observable we setup from the service
    this.subcription = this.authService.auth$.subscribe();
    // reactive approach to select user from store.
    this.user$ = this.store.select<User>("user");
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
