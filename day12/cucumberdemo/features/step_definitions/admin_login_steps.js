// ─────────────────────────────────────────────────────────────────────────────
// features/step_definitions/admin_login_steps.js
// Step definitions for Admin Login feature
// App URL: http://localhost:5173/admin-login
// Credentials: admin@company.com / Admin@1234
// ─────────────────────────────────────────────────────────────────────────────
const { Given, When, Then } = require("@cucumber/cucumber");
const { By, until }         = require("selenium-webdriver");
const assert                = require("assert");

const ADMIN_LOGIN_URL = "http://localhost:5173/admin-login";
const WAIT_MS         = 5000;

// ── Background step ──────────────────────────────────────────────────────────
Given("the Admin Login page is open", async function () {
  await this.driver.get(ADMIN_LOGIN_URL);
  await this.driver.wait(
    until.elementLocated(By.id("admin-email")),
    WAIT_MS,
    "Admin email field not found within timeout"
  );
  console.log("✅ [Admin] Opened:", ADMIN_LOGIN_URL);
});

// ── When steps ───────────────────────────────────────────────────────────────
When("I enter admin email {string}", async function (email) {
  const field = await this.driver.findElement(By.id("admin-email"));
  await field.clear();
  await field.sendKeys(email);
  console.log(`   → Entered Admin Email: ${email}`);
});

When("I enter admin password {string}", async function (password) {
  const field = await this.driver.findElement(By.id("admin-password"));
  await field.clear();
  await field.sendKeys(password);
  console.log(`   → Entered Admin Password: ${"*".repeat(password.length)}`);
});

When("I click the admin Sign In button", async function () {
  const btn = await this.driver.findElement(By.id("admin-login-btn"));
  await btn.click();
  console.log("   → Clicked Admin Sign In button");
});

// ── Then steps ───────────────────────────────────────────────────────────────
Then("I should see the admin error message {string}", async function (expectedMsg) {
  const alert = await this.driver.wait(
    until.elementLocated(By.css(".error-alert")),
    WAIT_MS,
    "Admin error alert element not found within timeout"
  );
  const text = await alert.getText();
  console.log(`✅ Admin Error message displayed: "${text}"`);
  assert.ok(
    text.toLowerCase().includes(expectedMsg.toLowerCase()),
    `Expected error containing "${expectedMsg}" but got: "${text}"`
  );
});
