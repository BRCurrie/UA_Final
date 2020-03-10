import { Component, forwardRef, ChangeDetectionStrategy } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: "workout-type",
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["workout-type.component.scss"],
  template: `
    <div class="workout-type">
      <div
        class="workout-type__pane"
        *ngFor="let selector of selectors"
        [class.active]="selector === value"
        (click)="setSelected(selector)"
      >
        <img src="/img/{{ selector }}.svg" />
        <p>
          {{ selector }}
        </p>
      </div>
    </div>
  `
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  selectors = ["strength", "endurance"];

  value: string;

  private onTouch: Function;
  private onModelChange: Function;

  // this function is provided to us by the ControlValueAccessor
  // We take this function and keep it locally
  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  // Same as onTouched, but it is for when we change a value
  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  // This is given to us by Angular based on our form.
  // The value that comes through is the type, i.e. strength
  // and sets our initial value.
  writeValue(value: string) {
    this.value = value;
  }

  // change value to the selected value
  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}
