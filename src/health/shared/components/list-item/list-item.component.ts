import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "list-item",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["list-item.component.scss"],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">
          {{ item.name }}
        </p>
        <p class="list-item__ingredients">
          <span> {{ item.ingredients }} </span>
        </p>
      </a>
      <div class="list-item__delete" *ngIf="toggled">
        <p>Delete item?</p>
        <button class="confirm" type="button" (click)="removeItem()">
          Yes
        </button>
        <!-- If user hits no toggle will remove delete item message -->
        <button class="cancel" type="button" (click)="toggle()">
          No
        </button>
      </div>

      <button class="trash" type="button" (click)="toggle()">
        <img src="/img/remove.svg" />
      </button>
    </div>
  `
})
export class ListItemComponent {
  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  // connects to the remove output in the meals component
  removeItem() {
    this.remove.emit(this.item);
  }

  // using the $key from the interface for the get route method
  getRoute(item: any) {
    return [`../meals`, item.$key];
  }
}
