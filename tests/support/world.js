const { World, setWorldConstructor, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { isMcpMode } = require('./mcp-integration');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.screenshotDir = path.join(process.cwd(), 'reports/screenshots');
  }

  async setUp() {
    // Skip browser setup if running in MCP mode (handled by mcp-integration.js)
    if (isMcpMode) {
      console.log('Setup already handled by MCP integration');
      return;
    }

    // Create browser instance
    this.browser = await chromium.launch({ 
      headless: false,
      slowMo: 100 // Slow down actions for visibility during testing
    });
    
    // Create context with viewport size optimized for testing
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: path.join(process.cwd(), 'reports/videos')
      }
    });
    
    // Create page
    this.page = await this.context.newPage();
    
    // Ensure screenshot directory exists
    fs.mkdirSync(this.screenshotDir, { recursive: true });
  }

  async tearDown() {
    // Skip browser teardown if running in MCP mode
    if (isMcpMode) {
      console.log('Teardown handled by MCP integration');
      return;
    }

    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Take a screenshot with a formatted name based on scenario data
   * @param {string} name Name of the screenshot
   */
  async takeScreenshot(name) {
    // Skip screenshot if page is not available (happens in MCP mode when tests fail early)
    if (!this.page) {
      console.log('Cannot take screenshot: page is not available');
      return null;
    }
    
    const screenshotName = `${name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.png`;
    const screenshotPath = path.join(this.screenshotDir, screenshotName);
    
    try {
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      return screenshotPath;
    } catch (error) {
      console.log(`Failed to take screenshot: ${error.message}`);
      return null;
    }
  }
}

setWorldConstructor(CustomWorld); 