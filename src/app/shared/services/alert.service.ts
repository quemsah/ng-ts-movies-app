import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}
  openAlert(message, durationInSeconds, type) {
    // styles.css
    const classType = type + "-alert-snackbar";
    this._snackBar.open(message, null, {
      duration: durationInSeconds * 1000,
      panelClass: classType
    });
  }

  openInfoAlert(msg, dur) {
    return this.openAlert(msg, dur, "info");
  }
  openSuccessAlert(msg, dur) {
    return this.openAlert(msg, dur, "success");
  }
  openWarningAlert(msg, dur) {
    return this.openAlert(msg, dur, "warning");
  }
}
