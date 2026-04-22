# Playwright Automation

Playwright test automation suite targeting [Sauce Demo](https://www.saucedemo.com). Built as part of a structured QA skill-build to practice automation patterns I'd use on the job.

![Playwright](https://img.shields.io/badge/Playwright-1.59-green)

## Tech Stack

- Playwright
- JavaScript (ES6+)
- Node.js

## Project Structure

```
playwright-automation/
├── pages/
│   ├── LoginPage.js          # Login form selectors and actions
│   └── InventoryPage.js      # Product listing selectors and actions
└── tests/
    ├── login.spec.js         # Auth tests: login, error states, logout
    └── inventory.spec.js     # Inventory tests: page display, cart interactions
```

## Key Concepts Demonstrated

- **Page Object Model** — selectors and actions abstracted into `LoginPage.js` and `InventoryPage.js`
- **Assertions + Waits** — web-first assertions with Playwright's built-in auto-waiting
- **Environment Variables** — credentials stored in `.env`, never hardcoded
- **Cross-spec POM reuse** — same page classes shared across multiple test files

## Running Tests

Run the full suite:

```bash
npx playwright test
```

Run headed:

```bash
npx playwright test --headed
```

Run a single spec:

```bash
npx playwright test tests/login.spec.js
```
