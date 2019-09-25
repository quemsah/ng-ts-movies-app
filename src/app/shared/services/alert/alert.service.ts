import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  openAlert(message, durationInSeconds, type): void {
    // styles.css
    const classType = type + "-alert-snackbar";
    this.snackBar.open(message, null, {
      duration: durationInSeconds * 1000,
      panelClass: classType
    });
  }

  openInfoAlert(msg, dur): void {
    return this.openAlert(msg, dur, "info");
  }

  openSuccessAlert(msg, dur): void {
    return this.openAlert(msg, dur, "success");
  }

  openWarningAlert(msg, dur): void {
    return this.openAlert(msg, dur, "warning");
  }
}
