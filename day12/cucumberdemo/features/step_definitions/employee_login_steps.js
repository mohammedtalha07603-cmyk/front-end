// ─────────────────────────────────────────────────────────────────────────────
// features/step_definitions/employee_login_steps.js
// Step definitions for Employee Login feature
// App URL: http://localhost:5173/employee-login
// Credentials: EMP-00123 / Emp@1234
// ─────────────────────────────────────────────────────────────────────────────
const { Given, When, Then }   = require("@cucumber/cucumber");
const { By, until }           = require("selenium-webdriver");
const assert                  = require("assert");

const EMPLOYEE_LOGIN_URL = "http://localhost:5173/employee-login";
const DASHBOARD_URL      = "http://localhost:5173/dashboard";
const WAIT_MS            = 5000;   // max wait for elements / navigation

// ── Background step ──────────────────────────────────────────────────────────
Given("the Employee Login page is open", async function () {
  await this.driver.get(EMPLOYEE_LOGIN_URL);
  // Wait until the Employee ID input is present
  await this.driver.wait(
    until.elementLocated(By.id("emp-id")),
    WAIT_MS,
    "Employee ID field not found within timeout"
  );
  console.log("✅ [Employee] Opened:", EMPLOYEE_LOGIN_URL);
});

// ── When steps ───────────────────────────────────────────────────────────────
When("I enter employee ID {string}", async function (empId) {
  const field = await this.driver.findElement(By.id("emp-id"));
  await field.clear();
  await field.sendKeys(empId);
  console.log(`   → Entered Employee ID: ${empId}`);
});

When("I enter employee password {string}", async function (password) {
  const field = await this.driver.findElement(By.id("emp-password"));
  await field.clear();
  await field.sendKeys(password);
  console.log(`   → Entered Employee Password: ${"*".repeat(password.length)}`);
});

When("I click the employee Sign In button", async function () {
  const btn = await this.driver.findElement(By.id("employee-login-btn"));
  await btn.click();
  console.log("   → Clicked Employee Sign In button");
});

// ── Then steps ───────────────────────────────────────────────────────────────
Then("I should be redirected to the dashboard", async function () {
  // Wait up to 5 s for the URL to change to the dashboard
  await this.driver.wait(
    until.urlContains("/dashboard"),
    WAIT_MS,
    "Was NOT redirected to /dashboard within timeout"
  );
  const currentUrl = await this.driver.getCurrentUrl();
  console.log(`✅ Redirected to dashboard: ${currentUrl}`);
  assert.ok(
    currentUrl.includes("/dashboard"),
    `Expected dashboard URL but got: ${currentUrl}`
  );
});

Then("I should see the employee error message {string}", async function (expectedMsg) {
  // Wait for the error alert to appear
  const alert = await this.driver.wait(
    until.elementLocated(By.css(".error-alert")),
    WAIT_MS,
    "Error alert element not found within timeout"
  );
  const text = await alert.getText();
  console.log(`✅ Error message displayed: "${text}"`);
  assert.ok(
    text.toLowerCase().includes(expectedMsg.toLowerCase()),
    `Expected error containing "${expectedMsg}" but got: "${text}"`
  );
});
