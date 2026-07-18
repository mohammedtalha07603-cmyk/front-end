# Employee Management Login Page — Automation Tests
#
# Credentials:
#   Employee:  EMP-00123  /  Emp@1234
#   Admin:     admin@company.com  /  Admin@1234
#
# Tests run EXACTLY 2 TIMES each (retry: 1 in cucumber.json)
# ─────────────────────────────────────────────────────────────

@employee
Feature: Employee Login Page

  Background:
    Given the Employee Login page is open

  @employee @valid_login
  Scenario: Successful employee login with valid credentials
    When I enter employee ID "EMP-00123"
    And  I enter employee password "Emp@1234"
    And  I click the employee Sign In button
    Then I should be redirected to the dashboard

  @employee @invalid_login
  Scenario: Failed employee login with invalid credentials
    When I enter employee ID "WRONG-ID"
    And  I enter employee password "WrongPass"
    And  I click the employee Sign In button
    Then I should see the employee error message "Invalid ID or password"

  @employee @empty_fields
  Scenario: Employee login with empty fields
    When I click the employee Sign In button
    Then I should see the employee error message "Please fill in all fields"

  @employee @empty_password
  Scenario: Employee login with missing password
    When I enter employee ID "EMP-00123"
    And  I click the employee Sign In button
    Then I should see the employee error message "Please fill in all fields"
