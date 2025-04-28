const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Common actions
Given('I am on the login page {string}', async function(url) {
  await this.page.goto(`https://${url}`);
});

// UI Verification Steps
Then('I should see the Gather logo', async function() {
  const logo = await this.page.locator('img[alt="Gather Logo"], .logo, img:has-text("Gather")').first();
  await expect(logo).toBeVisible();
});

Then('I should see the text {string}', async function(text) {
  const textElement = await this.page.locator(`text="${text}"`).first();
  await expect(textElement).toBeVisible();
});

Then('I should see the email field labeled {string}', async function(label) {
  const emailField = await this.page.locator(`label:has-text("${label}"), input[placeholder="${label}"], input[aria-label="${label}"]`).first();
  await expect(emailField).toBeVisible();
});

Then('I should see the password field labeled {string}', async function(label) {
  const passwordField = await this.page.locator(`label:has-text("${label}"), input[placeholder="${label}"], input[aria-label="${label}"]`).first();
  await expect(passwordField).toBeVisible();
});

Then('I should see the login button with text {string}', async function(buttonText) {
  const loginButton = await this.page.locator(`button:has-text("${buttonText}"), input[value="${buttonText}"]`).first();
  await expect(loginButton).toBeVisible();
});

Then('I should see the Google login option with text {string}', async function(text) {
  const googleLogin = await this.page.locator(`text="${text}"`, { exact: false }).first();
  await expect(googleLogin).toBeVisible();
});

Then('I should see the {string} button', async function(text) {
  const button = await this.page.locator(`text="${text}"`, { exact: false }).first();
  await expect(button).toBeVisible();
});

// Field interaction steps
When('I click on the email field', async function() {
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  await emailField.click();
});

When('I click on the password field', async function() {
  const passwordField = await this.page.locator('input[type="password"], input[name="password"]').first();
  await passwordField.click();
});

Then('I should be able to type in the email field', async function() {
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  await emailField.fill('test@example.com');
  await expect(emailField).toHaveValue('test@example.com');
});

Then('I should be able to type in the password field', async function() {
  const passwordField = await this.page.locator('input[type="password"], input[name="password"]').first();
  await passwordField.fill('password123');
  await expect(passwordField).toHaveValue('password123');
});

Then('the password field should not have a visibility toggle', async function() {
  const passwordField = await this.page.locator('input[type="password"], input[name="password"]').first();
  const toggleElement = await this.page.locator('button[aria-label="Show password"], button[aria-label="Toggle password visibility"]').count();
  expect(toggleElement).toBe(0);
});

// Tab navigation
When('I press the tab key', async function() {
  await this.page.keyboard.press('Tab');
});

Then('the focus should move to the next field', async function() {
  const focused = await this.page.evaluate(() => {
    const activeElement = document.activeElement;
    return activeElement ? activeElement.tagName : null;
  });
  
  expect(focused).not.toBeNull();
});

// Field focus
When('I click elsewhere on the page', async function() {
  await this.page.locator('body').click();
});

When('I click on the email field again', async function() {
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  await emailField.click();
});

Then('the email field should be focused correctly', async function() {
  const focused = await this.page.evaluate(() => {
    return document.activeElement.type === 'email' || document.activeElement.name === 'email';
  });
  
  expect(focused).toBeTruthy();
});

// Login button state
Then('the login button should be disabled', async function() {
  const loginButton = await this.page.locator('button:has-text("Log In"), input[value="Log In"]').first();
  await expect(loginButton).toBeDisabled();
});

When('I enter a valid email in the email field', async function() {
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  await emailField.fill('test@example.com');
});

When('I enter a password in the password field', async function() {
  const passwordField = await this.page.locator('input[type="password"], input[name="password"]').first();
  await passwordField.fill('password123');
});

Then('the login button should be enabled', async function() {
  const loginButton = await this.page.locator('button:has-text("Log In"), input[value="Log In"]').first();
  await expect(loginButton).toBeEnabled();
});

// Email validation
When('I enter an invalid email format in the email field', async function() {
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  await emailField.fill('invalid-email');
});

Then('the email field should show an error', async function() {
  // Try to move focus away to trigger validation
  await this.page.locator('body').click();
  
  // Check for error message or error state
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  const isValid = await emailField.evaluate((el) => {
    return el.validity.valid;
  });
  
  expect(isValid).toBeFalsy();
});

When('I enter a valid email format in the email field', async function() {
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  await emailField.fill('valid@example.com');
});

Then('the email field should not show an error', async function() {
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  const isValid = await emailField.evaluate((el) => {
    return el.validity.valid;
  });
  
  expect(isValid).toBeTruthy();
});

// Login with valid credentials
When('I enter valid username and password', async function() {
  const emailField = await this.page.locator('input[type="email"], input[name="email"]').first();
  const passwordField = await this.page.locator('input[type="password"], input[name="password"]').first();
  
  await emailField.fill('user@example.com');
  await passwordField.fill('password123');
});

When('I click the login button', async function() {
  const loginButton = await this.page.locator('button:has-text("Log In"), input[value="Log In"]').first();
  await loginButton.click();
});

Then('I should be logged into my account', async function() {
  // Wait for navigation or dashboard elements to appear
  await this.page.waitForURL('**/dashboard/**', { timeout: 30000 });
  // You can add more specific checks here for dashboard UI elements
}); 