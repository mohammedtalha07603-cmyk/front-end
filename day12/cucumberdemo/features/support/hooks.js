// ─────────────────────────────────────────────────────────────────────────────
// features/support/hooks.js
// Global Before / After hooks — open & close the browser around each scenario
// ─────────────────────────────────────────────────────────────────────────────
const { Before, After, Status, setDefaultTimeout } = require("@cucumber/cucumber");

// Give each step up to 30 s before timing out
setDefaultTimeout(30_000);

Before(async function () {
  await this.openBrowser();
});

After(async function (scenario) {
  // Take a screenshot on failure so you can inspect what went wrong
  if (scenario.result.status === Status.FAILED && this.driver) {
    try {
      const screenshot = await this.driver.takeScreenshot();
      this.attach(screenshot, "image/png");
    } catch (_) { /* ignore screenshot errors */ }
  }
  await this.closeBrowser();
});
