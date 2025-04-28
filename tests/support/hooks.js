const { BeforeAll, AfterAll, Before, After, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { isMcpMode } = require('./mcp-integration');

// Setup directories before all tests
BeforeAll(async function() {
  const reportsDir = path.join(process.cwd(), 'reports');
  const screenshotsDir = path.join(reportsDir, 'screenshots');
  const videosDir = path.join(reportsDir, 'videos');

  // Ensure directories exist
  [reportsDir, screenshotsDir, videosDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  console.log(`Running tests in ${isMcpMode ? 'MCP' : 'standard'} mode`);
});

// Set up browser for each scenario
Before(async function(scenario) {
  this.scenarioName = scenario.pickle.name;
  console.log(`Running Scenario: ${this.scenarioName}`);
  
  // Skip setUp in MCP mode as it's handled in mcp-integration.js
  if (!isMcpMode) {
    await this.setUp();
  }
});

// Clean up after each scenario
After(async function(scenario) {
  try {
    // Take screenshot on failure
    if (scenario.result.status === Status.FAILED) {
      const screenshotPath = await this.takeScreenshot(`FAILED_${this.scenarioName}`);
      
      // Only attach screenshot if it was successfully taken
      if (screenshotPath) {
        const image = fs.readFileSync(screenshotPath);
        this.attach(image, 'image/png');
        console.log(`Screenshot saved to: ${screenshotPath}`);
      }
    }
    
    // Always take a final screenshot for documentation
    await this.takeScreenshot(`END_${this.scenarioName}`);
  } catch (error) {
    console.log(`Error taking screenshot: ${error.message}`);
  }
  
  // Skip tearDown in MCP mode as it's handled in mcp-integration.js
  if (!isMcpMode) {
    await this.tearDown();
  }
}); 