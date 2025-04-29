const { spawn } = require('child_process');
const fs = require('fs');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

// Create interface for reading command input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`${colors.bright}${colors.cyan}🤖 MCP AI Command Interface${colors.reset}`);
console.log(`${colors.yellow}Type your commands in natural language. Type 'exit' to quit.${colors.reset}\n`);

// Execute a command with the MCP server
function executeMcpCommand(featureFile) {
  return new Promise((resolve, reject) => {
    console.log(`${colors.cyan}Executing file with MCP server: ${colors.bright}${featureFile}${colors.reset}`);
    
    // Check if file exists
    if (!fs.existsSync(featureFile)) {
      console.log(`${colors.red}❌ File not found: ${featureFile}${colors.reset}`);
      reject(new Error(`File not found: ${featureFile}`));
      return;
    }
    
    // Run the MCP server with the feature file
    const process = spawn('node', ['mcp-ai-command.js', featureFile], { 
      shell: true,
      stdio: 'inherit'
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

// Process AI commands
function processCommand(command) {
  if (command.toLowerCase() === 'exit') {
    console.log(`${colors.green}Goodbye!${colors.reset}`);
    rl.close();
    return;
  }
  
  // Parse the command for "execute this file with mcp server"
  const executePattern = /execute\s+(?:this|the)?\s*(?:file)?\s*(?:with)?\s*mcp\s*server/i;
  
  if (executePattern.test(command)) {
    // Extract file name if it's in the command
    let fileName = null;
    
    // Look for file path in quotes
    const quotedPattern = /"([^"]+)"|'([^']+)'/;
    const quotedMatch = command.match(quotedPattern);
    
    if (quotedMatch) {
      fileName = quotedMatch[1] || quotedMatch[2];
    } else {
      // Try to find any word ending with .feature
      const featurePattern = /\b([^\s]+\.feature)\b/;
      const featureMatch = command.match(featurePattern);
      
      if (featureMatch) {
        fileName = featureMatch[1];
      }
    }
    
    if (!fileName) {
      console.log(`${colors.yellow}What file would you like to execute with the MCP server?${colors.reset}`);
      rl.question(`${colors.cyan}File path: ${colors.reset}`, (filePath) => {
        if (filePath) {
          executeMcpCommand(filePath)
            .then(() => {
              console.log(`${colors.green}✅ Command completed successfully!${colors.reset}`);
              prompt();
            })
            .catch((error) => {
              console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
              prompt();
            });
        } else {
          console.log(`${colors.red}No file specified. Command cancelled.${colors.reset}`);
          prompt();
        }
      });
    } else {
      executeMcpCommand(fileName)
        .then(() => {
          console.log(`${colors.green}✅ Command completed successfully!${colors.reset}`);
          prompt();
        })
        .catch((error) => {
          console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
          prompt();
        });
    }
  } else {
    console.log(`${colors.yellow}I don't understand that command.${colors.reset}`);
    console.log(`${colors.cyan}Try saying: "execute this file with mcp server features/your-file.feature"${colors.reset}`);
    prompt();
  }
}

// Prompt for commands
function prompt() {
  rl.question(`${colors.bright}${colors.cyan}AI> ${colors.reset}`, (command) => {
    processCommand(command);
  });
}

// Start the prompt
prompt();

// Handle exit events
rl.on('close', () => {
  process.exit(0);
}); 