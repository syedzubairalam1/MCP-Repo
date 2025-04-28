/**
 * Page Object Model for Login Page
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
    
    // Define locators
    this.logo = page.locator('img[alt="Gather Logo"], .logo, img:has-text("Gather")').first();
    this.loginHeading = page.locator('text="Log into your existing Gather account"');
    this.welcomeText = page.locator('text="We\'re excited to work hard with you today"');
    this.emailField = page.locator('input[type="email"], input[name="email"]');
    this.passwordField = page.locator('input[type="password"], input[name="password"]');
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
    this.loginButton = page.locator('button:has-text("Login"), button:has-text("LOG IN")');
    this.googleLoginButton = page.locator('a:has-text("Sign in with Google")');
    this.forgotPasswordLink = page.locator('a:has-text("Forgot your password?")');
    this.needAccountLink = page.locator('a:has-text("Need an account?")');
    this.errorMessage = page.locator('p.alert, div.alert, text="Invalid email or password"');
  }

  /**
   * Navigate to the login page
   * @param {string} url The URL to navigate to
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Check if all UI elements are visible
   * @returns {Promise<boolean>} True if all UI elements are visible
   */
  async checkUIElements() {
    const elements = [
      this.logo,
      this.loginHeading,
      this.welcomeText,
      this.emailField,
      this.passwordField,
      this.loginButton,
      this.googleLoginButton,
      this.forgotPasswordLink,
      this.needAccountLink
    ];

    for (const element of elements) {
      if (!await element.isVisible()) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Enter email in the email field
   * @param {string} email The email to enter
   */
  async enterEmail(email) {
    await this.emailField.click();
    await this.emailField.fill(email);
  }

  /**
   * Enter password in the password field
   * @param {string} password The password to enter
   */
  async enterPassword(password) {
    await this.passwordField.click();
    await this.passwordField.fill(password);
  }

  /**
   * Check if the password field has a visibility toggle
   * @returns {Promise<boolean>} True if the password field has a visibility toggle
   */
  async hasPasswordToggle() {
    const toggleCount = await this.page.locator('button[aria-label="Show password"], button[aria-label="Toggle password visibility"]').count();
    return toggleCount > 0;
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Click the forgot password link
   */
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /**
   * Check if the login button is enabled
   * @returns {Promise<boolean>} True if the login button is enabled
   */
  async isLoginButtonEnabled() {
    return await this.loginButton.isEnabled();
  }

  /**
   * Login with email and password
   * @param {string} email The email to login with
   * @param {string} password The password to login with
   */
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Check if there is an error message displayed
   * @returns {Promise<boolean>} True if there is an error message
   */
  async hasErrorMessage() {
    return await this.errorMessage.isVisible();
  }

  /**
   * Press the tab key to navigate between fields
   */
  async pressTab() {
    await this.page.keyboard.press('Tab');
  }

  /**
   * Click on an empty area of the page
   */
  async clickEmptyArea() {
    await this.welcomeText.click();
  }
}

module.exports = LoginPage; 