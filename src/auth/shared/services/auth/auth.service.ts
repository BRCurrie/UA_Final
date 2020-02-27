import { Injectable } from "@angular/core";

import { Store } from "store";

import "rxjs/add/operator/do";

import { AngularFireAuth } from "angularfire2/auth";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.af.authState.do(next => {
    // if no user set value of user to null
    if (!next) {
      this.store.set("user", null);
      // then exit function
      return;
    }
    // update user in the store
    const user: User = {
      email: next.email,
      uid: next.uid,
      authenticated: true
    };
    // set user in the store
    this.store.set("user", user);
  });

  constructor(
    private store: Store,
    // introduce angular fire authentication and database
    private af: AngularFireAuth
  ) {}

  // helper function for our auth.guard
  get authState() {
    return this.af.authState;
  }

  createUser(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.auth.signOut();
  }
}
