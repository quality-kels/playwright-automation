# Playwright Automation

Playwright test automation suite targeting [Sauce Demo](https://www.saucedemo.com). Built as part of a structured QA skill-build to practice automation patterns I'd use on the job.

## Tech Stack

- Playwright
- JavaScript (ES6+)
- Node.js

## Project Structure

```
playwright-automation/
├── tests/
│   ├── login.spec.js       # Login tests
│   └── inventory.spec.js   # Product page tests
└── pages/
├── LoginPage.js         # Page Object Model for login
└── InventoryPage.js     # Page Object Model for inventory
```

## Key Concepts Demonstrated

- **Page Object Model** — selectors and actions abstracted into page classes
- **Assertions + Waits** — web-first assertions with auto-waiting
- **Environment Variables** — credentials stored in `.env`, never hardcoded

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

## In Progress

Part of an active 8-week QA skill-build. Upcoming additions:

- CI/CD pipeline with GitHub Actions
- Docker containerization
- Python + Playwright test suite
