import { Injectable } from "@angular/core";

declare const enableDarkMode: any;

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  isDarkMode: boolean = false;
  wasRouted: boolean = false;

  constructor() {}

  // перед переходом выключаем дарк мод, если он был
  // и ставим wasRouted = true, чтобы потом включить
  forceDisableDarkModeBeforeRoute() {
    if (this.isDarkMode === true) {
      this.toggleDarkMode();
      this.wasRouted = true;
      console.log("Dark Mode forced to" + this.isDarkMode);
      console.log("wasRouted = " + this.wasRouted);
    }
  }
  // если был переход (wasRouted = true), то включаем даркмод обратно
  // и не забываем обнулить wasRouted
  checkDarkMode() {
      if (this.wasRouted === true) {
        this.toggleDarkMode();
        console.log("Dark Mode " + this.isDarkMode);
        this.wasRouted = false;
        console.log("wasRouted = " + this.wasRouted);
      }
  }
  // вкл/выкл
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
