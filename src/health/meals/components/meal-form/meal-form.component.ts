import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import { Meal } from "../../../shared/services/meals/meals.service";

@Component({
  selector: "meal-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["meal-form.component.scss"],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />
            <div class="error" *ngIf="required">
              Meal name is required
            </div>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()"
            >
              <img src="/img/add-white.svg" />
              Add food
            </button>
          </div>
          <div formArrayName="ingredients">
            <!-- this is where we are hooking up form array to add indidvidual pieces of food.
            We iterate over our ingredient controls.
              c is the current ingredient as we iterate over them -->
            <label *ngFor="let c of ingredients.controls; index as i">
              <!-- ngFor ingredients does not correspond to the formArrayName, it is setup on the class -->
              <input [formControlName]="i" placeholder="e.g. Eggs" />
              <span class="meal-form__remove" (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>
        <div class="meal-form__submit">
          <div>
            <button type="button" class="button" (click)="createMeal()">
              Create meal
            </button>
            <a class="button button--cancel" [routerLink]="['../']"> Cancel</a>
          </div>
        </div>
      </form>
    </div>
  `
})
export class MealFormComponent {
  @Output()
  create = new EventEmitter<Meal>();

  form = this.fb.group({
    // We use the name field to validate the form
    name: ["", Validators.required],
    ingredients: this.fb.array([""])
  });

  constructor(private fb: FormBuilder) {}

  get required() {
    return (
      this.form.get("name").hasError("required") &&
      this.form.get("name").touched
    );
  }

  get ingredients() {
    return this.form.get("ingredients") as FormArray;
  }

  // we a pushing a string into the FormArray, and we initialize it with an empty string.
  addIngredient() {
    this.ingredients.push(new FormControl(""));
  }

  // this.ingredients corresponds to the get ingredients() and we use the removeAt on the FormArray type.
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    // we want to emit the event with the form value, it wont event emits if the form is invalid.
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
}
