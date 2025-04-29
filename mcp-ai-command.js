const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.cyan}📋 AI Command: MCP Test Execution & Reporting${colors.reset}\n`);

// Get feature file from command line arguments
const featureFile = process.argv[2];

// Function to execute a command and return a promise
function executeCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`${colors.yellow}▶ Executing: ${colors.bright}${command} ${args.join(' ')}${colors.reset}`);
    
    const process = spawn(command, args, { 
      shell: true,
      stdio: 'inherit',
      ...options
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    process.on('error', (err) => {
      reject(err);
    });
  });
}

async function runMcpTests() {
  try {
    // Step 1: Check if MCP server is installed
    console.log(`${colors.cyan}Checking MCP server installation...${colors.reset}`);
    try {
      await executeCommand('npx', ['@executeautomation/playwright-mcp-server', '--version']);
      console.log(`${colors.green}✓ MCP server is installed${colors.reset}`);
    } catch (error) {
      console.log(`${colors.yellow}! MCP server not found, installing...${colors.reset}`);
      await executeCommand('npm', ['install', '-g', '@executeautomation/playwright-mcp-server']);
      console.log(`${colors.green}✓ MCP server installed successfully${colors.reset}`);
    }
    
    // Step 2: Check if we're executing a specific feature file
    let testCommand;
    if (featureFile) {
      // Check if feature file exists
      if (!fs.existsSync(featureFile)) {
        console.log(`${colors.red}❌ Feature file not found: ${featureFile}${colors.reset}`);
        return false;
      }
      
      console.log(`${colors.cyan}Executing specific feature file: ${colors.bright}${featureFile}${colors.reset}`);
      testCommand = `npx cucumber-js ${featureFile}`;
    } else {
      console.log(`${colors.cyan}Executing all test features${colors.reset}`);
      testCommand = 'npm run test';
    }
    
    // Step 3: Run the tests using MCP server
    console.log(`\n${colors.cyan}Starting test execution with MCP server...${colors.reset}`);
    if (featureFile) {
      await executeCommand('npx', ['@executeautomation/playwright-mcp-server', '--', 'npx', 'cucumber-js', featureFile]);
    } else {
      await executeCommand('npx', ['@executeautomation/playwright-mcp-server', '--', 'npm', 'run', 'test']);
    }
    console.log(`${colors.green}✓ Tests executed successfully${colors.reset}`);
    
    // Step 4: Generate the test report
    console.log(`\n${colors.cyan}Generating test reports...${colors.reset}`);
    await executeCommand('npm', ['run', 'report']);
    console.log(`${colors.green}✓ Test reports generated successfully${colors.reset}`);
    
    // Step 5: Check if reports were created
    const reportPath = path.join(process.cwd(), 'reports', 'cucumber-report.html');
    if (fs.existsSync(reportPath)) {
      console.log(`\n${colors.bright}${colors.green}✅ Success! Test reports are available at:${colors.reset}`);
      console.log(`${colors.cyan}${reportPath}${colors.reset}\n`);
    } else {
      console.log(`\n${colors.yellow}⚠️ Report file not found at expected location: ${reportPath}${colors.reset}\n`);
    }
    
    return true;
  } catch (error) {
    console.error(`\n${colors.red}❌ Error: ${error.message}${colors.reset}\n`);
    return false;
  }
}

// Execute the function
runMcpTests().then(success => {
  if (success) {
    console.log(`${colors.bright}${colors.green}🚀 MCP Test Automation Complete!${colors.reset}`);
    if (featureFile) {
      console.log(`${colors.green}Feature file executed: ${featureFile}${colors.reset}`);
    }
  } else {
    console.log(`${colors.bright}${colors.red}❌ MCP Test Automation Failed!${colors.reset}`);
    process.exit(1);
  }
}); 