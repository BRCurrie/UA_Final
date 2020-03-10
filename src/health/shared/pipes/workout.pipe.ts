import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "workout"
})
export class WorkoutPipe implements PipeTransform {
  transform(value: any) {
    if (value.type === "endurance") {
      return `
            Distance: ${value.endurance.distance + "km"}, 
            Duration: ${value.endurance.duration + "mins"}
            `;
    } else {
      return `
        weight: ${value.strength.weight + "kg"},
        reps: ${value.strength.reps},
        sets: ${value.strength.sets}
        `;
    }
  }
}
