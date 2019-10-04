import { Injectable } from "@angular/core";

declare const enableDarkMode: any;

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  public isDarkMode = false;
  public wasRouted = false;
  // начальные значения
  public red = 59;
  public green = 133;
  public blue = 206;
  public random = 0;
  public themeGradient: string = this.setGradient(this.red, this.green, this.blue, this.random);
  public themeColor: string = this.setColor(this.red, this.green, this.blue);
  constructor() {}

  public rgbToHex(rgb: number): string {
    const hex = Math.round(Math.min(Math.max(0, rgb), 255)).toString(16);
    return hex.length < 2 ? "0" + hex : hex;
  }

  public fullColorHex(red: number, green: number, blue: number): string {
    return this.rgbToHex(red) + this.rgbToHex(green) + this.rgbToHex(blue);
  }

  public mix(color: number, param: number): number {
    return Math.round((1 + param) * color);
  }

  public getNum(random: number): number {
    return parseFloat((Math.random() * (random + random) - random).toFixed(2));
  }

  public setGradient(red: number, green: number, blue: number, random: number): string {
    const alpha = 0.3;
    const beta = -0.5;
    // параметры сдвига цвета
    const gamma = Array.apply(null, { length: 6 }).map(() => this.getNum(random));
    // еще немного случайные параметры зависящие от коэф. рандома
    const sRed = this.mix(red, alpha - 0.13 + gamma[0]);
    const sGreen = this.mix(green, alpha + 0.21 + gamma[1]);
    const sBlue = this.mix(blue, alpha - 0.08 + gamma[2]);
    const eRed = this.mix(red, beta + 0.32 + gamma[3]);
    const eGreen = this.mix(green, beta - 0.02 + gamma[4]);
    const eBlue = this.mix(blue, beta + 0.27 + gamma[5]);
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

  public setColor(red: number, green: number, blue: number): string {
    const color = "#" + this.fullColorHex(red, green, blue);
    this.themeColor = color;
    console.log("Theme color: ", this.themeColor);
    return color;
  }
  // перед переходом выключаем дарк мод, если он был
  // и ставим wasRouted = true, чтобы потом включить
  public forceDisableDarkModeBeforeRoute(): void {
    if (this.isDarkMode === true) {
      this.toggleDarkMode();
      this.wasRouted = true;
      console.log("Dark Mode forced to " + this.isDarkMode);
      console.log("wasRouted = " + this.wasRouted);
    }
  }
  // если был переход (wasRouted = true), то включаем даркмод обратно
  // и не забываем обнулить wasRouted
  public checkDarkMode(): void {
    if (this.wasRouted === true) {
      this.toggleDarkMode();
      this.wasRouted = false;
      console.log("Dark Mode = " + this.isDarkMode);
      console.log("wasRouted = " + this.wasRouted);
    }
  }
  // вкл/выкл
  public toggleDarkMode(): void {
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
