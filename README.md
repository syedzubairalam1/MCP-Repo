# Playwright Cucumber Tests

This project contains automated UI tests for the Gather app functionality using Playwright and Cucumber.js.

## Project Structure

```
├── features/              # Feature files (Gherkin syntax)
│   ├── login.feature      # Login feature tests
│   └── signup.feature     # Signup feature tests (to be implemented)
├── tests/
│   ├── pages/             # Page Object Models
│   │   └── LoginPage.js   # Login page object model
│   ├── step_definitions/  # Step definitions for feature files
│   │   └── loginSteps.js  # Login step implementations
│   └── support/           # Support files
│       ├── hooks.js       # Before/After hooks
│       ├── world.js       # Custom world for sharing context
│       └── reporting/     # Reporting utilities
│           └── reporter.js # Reporter configuration
├── reports/               # Generated test reports (created when tests run)
│   ├── screenshots/       # Screenshots taken during test execution
│   ├── videos/            # Videos recorded during test execution
│   ├── cucumber-report.json # JSON report
│   └── cucumber-report.html # HTML report
├── cucumber.js           # Cucumber configuration
├── generate-report.js    # Script to generate HTML report
└── package.json          # Project dependencies and scripts
```

## Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Install browser drivers:
   ```
   npm run install:browsers
   ```

## Running the Tests

Run all tests:
```
npm test
```

Run login feature tests only:
```
npm run test:login
```

Run tests and generate reports:
```
npm run test:report
```

Run login tests and generate reports:
```
npm run test:login:report
```

## Reports

After running the tests with the report scripts, the HTML report will be automatically opened in your default browser. 
You can also find the reports in the `reports` directory:

- HTML Report: `reports/cucumber-report.html`
- JSON Report: `reports/cucumber-report.json`
- Screenshots: `reports/screenshots/`
- Videos: `reports/videos/`

## Adding New Tests

1. Create a new feature file in the `features` directory
2. Create a new page object in `tests/pages`
3. Implement step definitions in `tests/step_definitions` 