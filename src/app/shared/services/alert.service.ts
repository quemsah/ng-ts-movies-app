import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  openAlert(message, durationInSeconds) {
    this._snackBar.open(message, null, {
      duration: durationInSeconds * 1000
    });
  }
}
