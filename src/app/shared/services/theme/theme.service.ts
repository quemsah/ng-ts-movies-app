import { Injectable } from "@angular/core";

declare const enableDarkMode: any;

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  isDarkMode: boolean = false;
  wasRouted: boolean = false;
  // начальные значения
  red: number = 7;
  green: number = 103;
  blue: number = 251;
  themeGradient: string = this.setGradient(this.red, this.green, this.blue);
  themeColor: string = this.setColor(this.red, this.green, this.blue);
  constructor() //setGradient(32,199,107);
  {}

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

  setGradient(red: number, green: number, blue: number): string {
    const alpha = 0.3;
    const beta = -0.5;
    const sRed = this.mix(red, alpha);
    const sGreen = this.mix(green, alpha);
    const sBlue = this.mix(blue, alpha);
    const eRed = this.mix(red, beta);
    const eGreen = this.mix(green, beta);
    const eBlue = this.mix(blue, beta);
    const gr =
      "linear-gradient(40deg, #" +
      this.fullColorHex(sRed, sGreen, sBlue) +
      ", #" +
      this.fullColorHex(eRed, eGreen, eBlue) +
      ")";
    this.themeGradient = gr;
    return gr;
    //console.log(this.themeGradient);
  }

  setColor(red: number, green: number, blue: number): string {
    const color = "#" + this.fullColorHex(red, green, blue);
    this.themeColor = color;
    return color;
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
