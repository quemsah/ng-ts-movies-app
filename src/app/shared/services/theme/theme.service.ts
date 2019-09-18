import { Injectable } from "@angular/core";

declare const enableDarkMode: any;

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  isDarkMode: boolean = false;
  wasRouted: boolean = false;
  themeGradient: string = "linear-gradient(40deg, #45cafc, #303f9f)";

  constructor() {}

  rgbToHex(rgb) {
    var hex = Math.round(Math.min(Math.max(0, rgb), 255)).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }
  fullColorHex(r, g, b) {
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return red + green + blue;
  }
  mix(color: number, param: number) {
    return Math.round((1 + param) * color);
  }
  setGradient(red: number, green: number, blue: number) {
    const alpha = 0.3;
    const beta = -0.5;
    const s_red = this.mix(red, alpha);
    const s_green = this.mix(green, alpha);
    const s_blue = this.mix(blue, alpha);
    const e_red = this.mix(red, beta);
    const e_green = this.mix(green, beta);
    const e_blue = this.mix(blue, beta);
    console.log(s_red - red);
    console.log(e_red - red);

    this.themeGradient =
      "linear-gradient(40deg, #" +
      this.fullColorHex(s_red, s_green, s_blue) +
      ", #" +
      this.fullColorHex(e_red, e_green, e_blue) +
      ")";
    console.log(this.themeGradient);
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
