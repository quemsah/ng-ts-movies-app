import { Injectable } from "@angular/core";

declare const enableDarkMode: any;

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  isDarkMode = false;
  wasRouted = false;
  // начальные значения
  red = 12;
  green = 133;
  blue = 226;
  themeGradient: string = this.setGradient(this.red, this.green, this.blue);
  themeColor: string = this.setColor(this.red, this.green, this.blue);
  constructor() {}

  rgbToHex(rgb: number): string {
    const hex = Math.round(Math.min(Math.max(0, rgb), 255)).toString(16);
    return hex.length < 2 ? "0" + hex : hex;
  }

  fullColorHex(red: number, green: number, blue: number): string {
    return this.rgbToHex(red) + this.rgbToHex(green) + this.rgbToHex(blue);
  }

  mix(color: number, param: number): number {
    return Math.round((1 + param) * color);
  }

  setGradient(red: number, green: number, blue: number): string {
    // параметры сдвига цвета
    const alpha = 0.3;
    const beta = -0.5;
    // коэффициент рандома
    const random = 0.2;
    // массив из рандомных чисел
    const randomArray = Array.apply(null, { length: 6 }).map(() =>
      parseFloat((Math.random() * (random + random) - random).toFixed(2))
    );
    const sRed = this.mix(red, alpha + randomArray[0]);
    const sGreen = this.mix(green, alpha + randomArray[1]);
    const sBlue = this.mix(blue, alpha + randomArray[2]);
    const eRed = this.mix(red, beta + randomArray[3]);
    const eGreen = this.mix(green, beta + randomArray[4]);
    const eBlue = this.mix(blue, beta + randomArray[5]);
    const gr =
      "linear-gradient(40deg, #" +
      this.fullColorHex(sRed, sGreen, sBlue) +
      ", #" +
      this.fullColorHex(eRed, eGreen, eBlue) +
      ")";
    this.themeGradient = gr;
    console.log("Theme gradient: ", this.themeGradient);
    return gr;
  }

  setColor(red: number, green: number, blue: number): string {
    const color = "#" + this.fullColorHex(red, green, blue);
    this.themeColor = color;
    console.log("Theme color: ", this.themeColor);
    return color;
  }
  // перед переходом выключаем дарк мод, если он был
  // и ставим wasRouted = true, чтобы потом включить
  forceDisableDarkModeBeforeRoute(): void {
    if (this.isDarkMode === true) {
      this.toggleDarkMode();
      this.wasRouted = true;
      console.log("Dark Mode forced to " + this.isDarkMode);
      console.log("wasRouted = " + this.wasRouted);
    }
  }
  // если был переход (wasRouted = true), то включаем даркмод обратно
  // и не забываем обнулить wasRouted
  checkDarkMode(): void {
    if (this.wasRouted === true) {
      this.toggleDarkMode();
      this.wasRouted = false;
      console.log("Dark Mode = " + this.isDarkMode);
      console.log("wasRouted = " + this.wasRouted);
    }
  }
  // вкл/выкл
  toggleDarkMode(): void {
    if (this.isDarkMode === false) {
      this.isDarkMode = true;
      enableDarkMode();
    } else {
      this.isDarkMode = false;
      enableDarkMode();
    }
    console.log("Dark Mode toggled = " + this.isDarkMode);
  }
}
