import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  public openAlert(message, durationInSeconds, type): void {
    const classType = type + "-alert-snackbar";
    this.snackBar.open(message, null, {
      duration: durationInSeconds * 1000,
      panelClass: classType
    });
  }

  public openInfoAlert(msg, dur): void {
    return this.openAlert(msg, dur, "info");
  }

  public openSuccessAlert(msg, dur): void {
    return this.openAlert(msg, dur, "success");
  }

  public openWarningAlert(msg, dur): void {
    return this.openAlert(msg, dur, "warning");
  }
}
