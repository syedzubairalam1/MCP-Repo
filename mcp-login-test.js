// MCP Playwright direct test script for login feature
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create reports directory if it doesn't exist
const reportsDir = path.join(__dirname, 'reports');
const screenshotsDir = path.join(reportsDir, 'screenshots');

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

console.log('Starting MCP Playwright test for login feature...');

// Start the MCP server
console.log('Starting MCP Server...');
const mcpServer = spawn('npx', ['@executeautomation/playwright-mcp-server'], { 
  stdio: 'inherit',
  shell: true 
});

// Wait for MCP server to initialize (5 seconds)
console.log('Waiting for MCP server to initialize...');
setTimeout(() => {
  console.log('Executing browser script for login feature...');
  
  // Execute the Playwright direct test
  const testProcess = spawn('node', ['mcp-playwright-test.js'], {
    stdio: 'inherit',
    shell: true
  });
  
  // Handle test process completion
  testProcess.on('close', (code) => {
    console.log(`Test process exited with code ${code}`);
    
    // Kill the MCP server
    mcpServer.kill();
    console.log('MCP server stopped');
  });
  
}, 5000); 