import { browser, logging } from "protractor";
import { AppPage } from "./app.po";

describe("workspace-project App", () => {
  let page: AppPage;

  const wrongCredentias = {
    username: "wrongname",
    password: "wrongpasswd"
  };

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display Log in form title", () => {
    page.navigateTo();
    expect(page.getTextByElement("app-root h3")).toEqual("Log in");
  });

  // tslint:disable-next-line: max-line-length
  it("when user trying to login with wrong credentials he should stay on Log in page and see error notification", () => {
    page.navigateTo();
    page.fillCredentials();
    expect(page.getErrorMessage()).toEqual(
      "There is no user record corresponding to this identifier. The user may have been deleted."
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
