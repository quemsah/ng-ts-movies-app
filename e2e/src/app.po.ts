import { browser, by, element } from "protractor";

export class AppPage {
  private credentias = {
    email: "test@yandex.ru",
    password: "testtest"
  };

  public navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  public getTextByElement(selector) {
    return element(by.css(selector)).getText();
  }

  public clickByElement(selector) {
    element(by.css(selector)).click();
  }

  public getElement(selector) {
    return element(by.css(selector));
  }

  public fillCredentials(credentias: any = this.credentias) {
    element(by.css("#email")).sendKeys(credentias.email);
    element(by.css("#password")).sendKeys(credentias.password);
    element(by.css("#login-button")).click();
  }

  public getErrorMessage() {
    return element(by.css(".warning-alert-snackbar")).getText();
  }
}
