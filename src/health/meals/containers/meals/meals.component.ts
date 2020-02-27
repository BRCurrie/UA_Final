import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { Store } from "store";

// services
import {
  MealsService,
  Meal
} from "../../../shared/services/meals/meals.service";

@Component({
  selector: "meals",
  styleUrls: ["meals.component.scss"],
  template: `
    <div>
      {{ meals$ | async | json }}
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subcription: Subscription;

  constructor(private store: Store, private mealsService: MealsService) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>("meals");
    this.subcription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
