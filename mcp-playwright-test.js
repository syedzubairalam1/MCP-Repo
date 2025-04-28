const { chromium } = require('@playwright/test');

// This script demonstrates using Playwright directly, as the MCP server would
(async () => {
  console.log('Starting Playwright browser directly...');
  
  // Launch browser
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100
  });
  
  // Create a new browser context
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  // Create a new page
  const page = await context.newPage();
  
  try {
    // Navigate to the login page
    console.log('Navigating to login page...');
    await page.goto('https://go.gatherit.co/users/sign_in');
    
    // Take a screenshot
    console.log('Taking a screenshot...');
    await page.screenshot({ path: 'reports/screenshots/login-page.png', fullPage: true });
    
    // Check for UI elements
    console.log('Checking UI elements...');
    
    // Look for the email field
    const emailField = page.locator('input[type="email"], input[name="email"]');
    if (await emailField.isVisible()) {
      console.log('✅ Email field is visible');
      
      // Enter email
      await emailField.fill('test@example.com');
      console.log('✅ Entered email');
    } else {
      console.log('❌ Email field not found');
    }
    
    // Look for the password field
    const passwordField = page.locator('input[type="password"], input[name="password"]');
    if (await passwordField.isVisible()) {
      console.log('✅ Password field is visible');
      
      // Enter password
      await passwordField.fill('password123');
      console.log('✅ Entered password');
    } else {
      console.log('❌ Password field not found');
    }
    
    // Look for the login button
    const loginButton = page.locator('button:has-text("Login"), button:has-text("LOG IN")');
    if (await loginButton.isVisible()) {
      console.log('✅ Login button is visible');
      
      // Click login button
      await loginButton.click();
      console.log('✅ Clicked login button');
      
      // Take another screenshot after login attempt
      await page.screenshot({ path: 'reports/screenshots/after-login.png', fullPage: true });
    } else {
      console.log('❌ Login button not found');
    }
    
    console.log('Test completed');
  } catch (error) {
    console.error(`Test failed: ${error.message}`);
    // Take a screenshot on error
    await page.screenshot({ path: 'reports/screenshots/error.png', fullPage: true });
  } finally {
    // Close browser
    await browser.close();
    console.log('Browser closed');
  }
})(); 