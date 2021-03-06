import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "noInfo"
})
export class NoInfoPipe implements PipeTransform {
  public transform(value: string) {
    return (value = value ? (value = value === "$ 0" ? "No information" : value) : value);
  }
}
