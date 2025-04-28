/**
 * MCP server integration for Playwright tests
 * This file provides utilities to connect to MCP server and execute tests through it
 */

const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { spawn } = require('child_process');
const path = require('path');

// Check if MCP mode is enabled
const isMcpMode = process.env.MCP_SERVER_MODE === 'true';
let mcpProcess;

// Start MCP server before all tests
if (isMcpMode) {
  BeforeAll(async function() {
    console.log('Starting MCP server...');
    // Start the MCP server as a child process
    mcpProcess = spawn('npx', ['@executeautomation/playwright-mcp-server'], {
      shell: true,
      detached: true,
      stdio: 'inherit'
    });
    
    // Wait for the MCP server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('MCP server started');
  });

  AfterAll(async function() {
    console.log('Shutting down MCP server...');
    if (mcpProcess) {
      process.kill(-mcpProcess.pid);
    }
  });
  
  // Override the browser initialization for MCP
  Before(async function(scenario) {
    console.log(`Running Scenario in MCP mode: ${scenario.pickle.name}`);
    
    // Create browser instance for MCP
    this.browser = await chromium.launch({ 
      headless: false,
      slowMo: 100 
    });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    
    this.page = await this.context.newPage();
  });

  // Clean up after each scenario
  After(async function() {
    if (this.browser) {
      await this.browser.close();
    }
  });
}

module.exports = {
  isMcpMode
}; 