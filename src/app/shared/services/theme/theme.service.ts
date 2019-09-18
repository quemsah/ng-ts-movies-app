import { Injectable } from "@angular/core";

declare const enableDarkMode: any;

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  isDarkMode: boolean = false;
  wasRouted: boolean = false;
  themeGradient: string;

  constructor() {}

  rgbToHex(rgb: number) {
    var hex = Math.round(Math.min(Math.max(0, rgb), 255)).toString(16);
    return hex.length < 2 ? "0" + hex : hex;
  }
  fullColorHex(red: number, green: number, blue: number) {
    return this.rgbToHex(red) + this.rgbToHex(green) + this.rgbToHex(blue);
  }
  mix(color: number, param: number) {
    return Math.round((1 + param) * color);
  }
  setGradient(red: number, green: number, blue: number) {
    const alpha = 0.3;
    const beta = -0.5;
    const sRed = this.mix(red, alpha);
    const sGreen = this.mix(green, alpha);
    const sBlue = this.mix(blue, alpha);
    const eRed = this.mix(red, beta);
    const eGreen = this.mix(green, beta);
    const eBlue = this.mix(blue, beta);
    this.themeGradient =
      "linear-gradient(40deg, #" +
      this.fullColorHex(sRed, sGreen, sBlue) +
      ", #" +
      this.fullColorHex(eRed, eGreen, eBlue) +
      ")";
    //console.log(this.themeGradient);
  }
  // перед переходом выключаем дарк мод, если он был
  // и ставим wasRouted = true, чтобы потом включить
  forceDisableDarkModeBeforeRoute() {
    if (this.isDarkMode === true) {
      this.toggleDarkMode();
      this.wasRouted = true;
      console.log("Dark Mode forced to " + this.isDarkMode);
      console.log("wasRouted = " + this.wasRouted);
    }
  }
  // если был переход (wasRouted = true), то включаем даркмод обратно
  // и не забываем обнулить wasRouted
  checkDarkMode() {
    if (this.wasRouted === true) {
      this.toggleDarkMode();
      this.wasRouted = false;
      console.log("Dark Mode = " + this.isDarkMode);
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
    // console.log("Dark Mode = " + this.isDarkMode);
  }
}
