import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/switchMap";

import {
  Meal,
  MealsService
} from "../../../shared/services/meals/meals.service";

@Component({
  selector: "meal",
  styleUrls: ["meal.component.scss"],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="img/food.svg" />
          <span *ngIf="meal$ | async as meal; else title">
            {{ meal.name ? "Edit" : "Create" }} meal</span
          >
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div>
        <meal-form (create)="addMeal($event)"> </meal-form>
      </div>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<Meal>;
  subsciprion: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // subscribe to meal$ from MealsService
    this.subsciprion = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.switchMap(param => {
      return this.mealsService.getMeal(param.id);
    });
  }

  ngOnDestroy() {
    this.subsciprion.unsubscribe();
  }

  async addMeal(event: Meal) {
    // console.log("Meal:", event);
    await this.mealsService.addMeal(event);
    // then redirect
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(["meals"]);
  }
}
