# 🥒 CucumberDemo — Employee Management Login Automation

Automated BDD (Behaviour-Driven Development) test suite for the **Employee Management System** login pages, powered by **Cucumber.js** + **Selenium WebDriver**.

---

## 📁 Project Structure

```
cucumberdemo/
├── cucumber.json                        ← Cucumber runner config (retry: 1 → runs 2 times)
├── package.json
├── features/
│   ├── employee_login.feature           ← BDD scenarios for Employee Login
│   ├── admin_login.feature              ← BDD scenarios for Admin Login
│   ├── step_definitions/
│   │   ├── employee_login_steps.js      ← Step implementations (Employee)
│   │   └── admin_login_steps.js         ← Step implementations (Admin)
│   └── support/
│       ├── world.js                     ← Shared WebDriver (Chrome headless)
│       └── hooks.js                     ← Before/After hooks + screenshot on failure
└── reports/
    ├── cucumber-report.html             ← Generated after test run
    └── cucumber-report.json             ← JSON report
```

---

## ✅ Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18+ |
| Google Chrome | Latest |
| ChromeDriver | Auto-managed by `selenium-webdriver` |

> **IMPORTANT:** Make sure the React app is running on `http://localhost:5173` before running tests.
> ```
> cd employee-product
> npm run dev
> ```

---

## 🚀 Running Tests

### Install dependencies (first time only)
```bash
cd cucumberdemo
npm install
```

### Run ALL tests (runs each scenario **exactly 2 times**)
```bash
npm test
```

### Run only Employee Login tests
```bash
npm run test:employee
```

### Run only Admin Login tests
```bash
npm run test:admin
```

---

## 🔁 Why does each test run 2 times?

The `cucumber.json` has `"retry": 1` which means:
- **1st run** = initial execution
- **2nd run** = retry (if the first one failed, or always runs to confirm stability)

This gives you exactly **2 runs per scenario** as requested.

---

## 🔐 Demo Credentials

| Portal | Username | Password |
|--------|----------|----------|
| Employee | `EMP-00123` | `Emp@1234` |
| Admin | `admin@company.com` | `Admin@1234` |

---

## 🧪 Test Scenarios

### Employee Login (`@employee`)
| Tag | Scenario |
|-----|----------|
| `@valid_login` | Successful login → redirected to dashboard |
| `@invalid_login` | Wrong credentials → error message shown |
| `@empty_fields` | No input → error message shown |
| `@empty_password` | ID only → error message shown |

### Admin Login (`@admin`)
| Tag | Scenario |
|-----|----------|
| `@valid_login` | Successful login → redirected to dashboard |
| `@invalid_login` | Wrong credentials → error message shown |
| `@empty_fields` | No input → error message shown |

---

## 📊 Reports

After running, open the HTML report:
```
reports/cucumber-report.html
```
