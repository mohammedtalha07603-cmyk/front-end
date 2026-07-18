// ─────────────────────────────────────────────────────────────────────────────
// features/support/world.js
// Cucumber World — shared WebDriver instance for all steps
// ─────────────────────────────────────────────────────────────────────────────
const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { Builder }                    = require("selenium-webdriver");
const chrome                         = require("selenium-webdriver/chrome");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.driver = null;
  }

  /** Launch Chrome (headless so it works in CI / without a display) */
  async openBrowser() {
    const opts = new chrome.Options()
      .addArguments(
        "--headless=new",    // headless Chrome
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--window-size=1440,900"
      );

    this.driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(opts)
      .build();
  }

  /** Quit browser gracefully */
  async closeBrowser() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }
}

setWorldConstructor(CustomWorld);
