# JavaScript for Playwright Learning Notes

These notes cover Day 1 to Day 4 of a fast-track JavaScript learning path focused on Playwright automation.

## Day 1: Variables, Functions, Objects, Arrays

### Variables

Use `const` when the value should not be reassigned.

```javascript
const username = 'standard_user';
```

Use `let` when the value may change.

```javascript
let count = 1;
count = 2;
```

### Functions

Functions are reusable blocks of code.

```javascript
function greetUser(name) {
  return 'Hello ' + name;
}
```

Arrow functions are common in Playwright.

```javascript
const add = (a, b) => {
  return a + b;
};
```

### Objects

Objects store related data together.

```javascript
const loginData = {
  username: 'standard_user',
  password: 'secret_sauce'
};
```

Access object values with dot notation.

```javascript
console.log(loginData.username);
```

### Arrays

Arrays store lists of values.

```javascript
const products = ['Backpack', 'Bike Light', 'T-Shirt'];
```

Access array values by index.

```javascript
console.log(products[1]);
```

### Key Takeaways

- Use `const` by default.
- Use `let` only when reassignment is needed.
- Objects are used heavily for test data.
- Arrays are useful for lists of products, users, or scenarios.

## Day 2: Async and Await

### Why Async Matters

Playwright actions take time, so they are asynchronous.

```javascript
await page.goto('https://www.saucedemo.com');
await page.locator('#user-name').fill('standard_user');
await page.locator('#login-button').click();
```

### Async Function

You can use `await` only inside an `async` function.

```javascript
async function openWebsite(page) {
  await page.goto('https://www.saucedemo.com');
}
```

### Why We Use `await`

`await` tells JavaScript to wait until the current browser action finishes before moving to the next step.

Without `await`, tests can become flaky because actions may run too early.

### Key Takeaways

- If it touches the browser, it usually needs `await`.
- `async` and `await` are essential for Playwright stability.
- Missing `await` is one of the most common automation mistakes.

## Day 3: Classes, Constructors, Methods, POM

### Class Example

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return 'Hello ' + this.name;
  }
}
```

### Constructor

The `constructor()` runs when a new object is created from a class.

```javascript
const user1 = new User('Devin');
```

### `this`

`this` refers to the current object.

```javascript
this.name = name;
```

### Methods

Methods are functions inside a class.

```javascript
sayHello() {
  return 'Hello ' + this.name;
}
```

### Playwright POM Example

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Why POM Is Useful

- Keeps locators out of tests
- Makes actions reusable
- Improves readability and maintainability

### Key Takeaways

- A class is a blueprint.
- A constructor sets up the object.
- Methods define actions.
- In Playwright, page classes represent screens or pages.

## Day 4: Test Structure, Assertions, Hooks, Fixtures

### Basic Test

```javascript
const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
```

### `test`

`test()` defines a test case.

### `expect`

`expect()` is used for assertions.

```javascript
await expect(page.locator('.title')).toHaveText('Products');
await expect(page.locator('#login-button')).toBeVisible();
```

### Fixtures

Fixtures are built-in Playwright objects passed into the test, like `page`.

```javascript
async ({ page })
```

### `test.describe`

Groups related tests together.

```javascript
test.describe('Login Tests', () => {
  test('valid login', async ({ page }) => {
    // test steps
  });
});
```

### Hooks

#### `beforeEach`

Runs before every test.

```javascript
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});
```

#### `afterEach`

Runs after every test.

Useful for cleanup or attaching logs.

#### `beforeAll`

Runs once before all tests in the block.

#### `afterAll`

Runs once after all tests in the block.

### `test.step`

Helps organize test execution into named steps.

```javascript
await test.step('Login with valid credentials', async () => {
  await loginPage.login('standard_user', 'secret_sauce');
});
```

### Good Test Formula

1. Prepare
2. Perform action
3. Verify result

### Key Takeaways

- Every test should include assertions.
- Use hooks to avoid repeated setup.
- Use `test.describe` to organize scenarios.
- Use `test.step` for cleaner reporting.

## Quick Revision Summary

- Day 1: Learn variables, functions, objects, arrays
- Day 2: Learn `async` and `await`
- Day 3: Learn classes and Page Object Model
- Day 4: Learn Playwright test structure, assertions, hooks, and fixtures

## Next Topics

- Day 5: Using POM properly in your framework
- Day 6: Assertions, hooks, and test data in real scenarios
- Day 7: Build a mini Playwright practice project
