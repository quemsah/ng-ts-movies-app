import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
// import { ThemeService } from "../services/theme/theme.service";

@Injectable({
  providedIn: "root"
})
export class OuterPagesGuard implements CanActivate {
  constructor() {} // public themeService: ThemeService

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this.themeService.forceDisableDarkModeBeforeRoute();
    return true;
  }
}
