# Playwright Page Object Model (POM) Framework

A robust, scalable test automation framework built with Playwright, featuring Page Object Model, Allure reporting, Winston logging, and environment-based configuration.

## 🚀 Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **Cross-browser testing**: Support for Chromium, Firefox, and WebKit
- **Allure Reporting**: Beautiful, detailed test reports with logs and attachments
- **Winston Logging**: Structured logging to console and files
- **Environment Configuration**: Flexible test data management via .env files
- **Parallel Execution**: Optimized for CI/CD with parallel test runs
- **Headless/Headed Modes**: Run tests in background or visible browser

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd playwright-pom-framework
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

4. **Set up environment variables**:
   Copy `.env.example` to `.env` and configure your test data:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your credentials and URLs.

## ⚙️ Configuration

### Environment Variables (.env)
```env
BASE_URL=htt
lps://www.saucedemo.com/
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```

### Playwright Configuration (playwright.config.js)
- **Projects**: Define browser configurations (chromium, firefox, webkit)
- **Reporters**: Allure for detailed reporting
- **Timeouts**: Configurable action and navigation timeouts
- **Parallelism**: Workers for concurrent test execution

### Test Data (testdata/)
- `loginData.js`: Centralized test data management
- Supports environment variable overrides for CI/CD

## 🏗️ Project Structure

```
playwright-pom-framework/
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
├── playwright.config.js   # Playwright configuration
├── README.md              # This file
├── allure-report/         # Generated Allure reports
├── allure-results/        # Raw Allure test results
├── logs/                  # Winston log files
├── pages/                 # Page Object Model classes
│   └── LoginPage.js       # Login page interactions
├── test-results/          # Playwright test artifacts
├── testdata/              # Test data files
│   └── loginData.js       # Login test data
├── tests/                 # Test specifications
│   └── login.spec.js      # Login test cases
└── utils/                 # Utility modules
    ├── config.js          # Application configuration
    └── logger.js          # Winston logger setup
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
# or
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/login.spec.js
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in headed mode (visible browser)
```bash
npx playwright test --project=chromium --headed
```

### Run tests with debugging
```bash
npx playwright test --debug
```

## 📊 Generating Reports

### Allure Report
1. **Run tests** (Allure results are generated automatically)
2. **Generate report**:
   ```bash
   npm run allure:report
   # or
   npx allure generate allure-results -o allure-report --clean
   ```
3. **Open report in browser**:
   ```bash
   npx allure open allure-report
   ```

### Clean Generated Reports
```bash
npm run clean:reports
```

This removes the generated `allure-report`, `allure-results`, `playwright-report`, and `test-results` folders before a fresh run.

### Playwright HTML Report
```bash
npx playwright show-report
```

## 📝 Writing Tests

### Page Object Pattern
Create page classes in `pages/` directory:

```javascript
// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.locator('.login-button');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
```

### Test Structure
Create test files in `tests/` directory:

```javascript
// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const loginData = require('../testdata/loginData');

test.describe('Login Tests', () => {
  test('Verify Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(loginData.username, loginData.password);
    // Add assertions
  });
});
```

## 🔧 Utilities

### Logger
```javascript
const logger = require('../utils/logger');
logger.info('Test started');
logger.error('Test failed');
```

### Configuration
```javascript
const config = require('../utils/config');
await page.goto(config.baseURL);
```

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npx playwright install
    - run: npm test
    - run: npm run allure:report
    - uses: actions/upload-artifact@v3
      with:
        name: allure-report
        path: allure-report/
```

## 🐛 Debugging

### Visual Debugging
- Use `--headed` flag to see browser actions
- Use `--debug` flag for step-by-step debugging

### Trace Viewer
```bash
npx playwright show-trace test-results/*/trace.zip
```

### Browser DevTools
```javascript
await page.pause(); // Pauses execution and opens DevTools
```

## 📈 Best Practices

- **Page Objects**: Keep page interactions separate from test logic
- **Test Data**: Use environment variables for sensitive data
- **Assertions**: Use descriptive assertion messages
- **Timeouts**: Configure appropriate timeouts for stability
- **Parallelism**: Leverage parallel execution for faster runs
- **Reporting**: Always generate reports for test analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions or issues:
- Check the [Playwright documentation](https://playwright.dev/)
- Review [Allure documentation](https://docs.qameta.io/allure/)
- Open an issue in this repository

---

Happy Testing! 🎭</content>
<parameter name="filePath">c:\Users\devin\OneDrive\Documents\playwright-pom-framework\README.md
