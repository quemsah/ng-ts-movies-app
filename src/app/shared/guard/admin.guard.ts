import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this.themeService.forceDisableDarkModeBeforeRoute();
    if (this.authService.isLoggedIn !== true) {
      console.log("Auth guard!");
      this.router.navigate(["login"]);
    }
    this.afAuth.authState.subscribe((user) => {
      if (!this.authService.checkRole(user)) {
        console.log("Admin guard!");
        this.router.navigate(["not-found"]);
      }
    });
    return true;
  }
}
