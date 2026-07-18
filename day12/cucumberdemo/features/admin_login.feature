# Employee Management Login Page — Admin Login Tests
#
# Credentials:
#   Admin:  admin@company.com  /  Admin@1234
#
# Tests run EXACTLY 2 TIMES each (retry: 1 in cucumber.json)
# ─────────────────────────────────────────────────────────────

@admin
Feature: Admin Login Page

  Background:
    Given the Admin Login page is open

  @admin @valid_login
  Scenario: Successful admin login with valid credentials
    When I enter admin email "admin@company.com"
    And  I enter admin password "Admin@1234"
    And  I click the admin Sign In button
    Then I should be redirected to the dashboard

  @admin @invalid_login
  Scenario: Failed admin login with wrong credentials
    When I enter admin email "wrong@company.com"
    And  I enter admin password "WrongPass"
    And  I click the admin Sign In button
    Then I should see the admin error message "Invalid email or password"

  @admin @empty_fields
  Scenario: Admin login with empty fields
    When I click the admin Sign In button
    Then I should see the admin error message "Please fill in all fields"
