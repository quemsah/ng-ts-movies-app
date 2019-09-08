import { Injectable } from "@angular/core";

declare const enableDarkMode: any;

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  isDarkMode: boolean = false;

  constructor() {}

  checkTheme() {
    console.log("Checking! Dark Mode " + this.isDarkMode);
    if (this.isDarkMode === true) {
      console.log("Подправляем?");
    } else {
    }
  }

  toggleDarkMode() {
    if (this.isDarkMode === false) {
      this.isDarkMode = true;
      enableDarkMode();
    } else {
      this.isDarkMode = false;
      enableDarkMode();
    }
    console.log("Dark Mode " + this.isDarkMode);
  }
}
