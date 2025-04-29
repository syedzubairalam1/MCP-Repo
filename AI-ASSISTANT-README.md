# MCP Test AI Assistant

This AI Assistant allows you to execute MCP tests using natural language commands and automatically generates CI/CD reports.

## Getting Started

### Prerequisites

- Node.js installed on your system
- Playwright MCP setup in your project

### Using the AI Assistant

1. Run the AI Assistant by double-clicking on `ai-assistant.bat` or running:
   ```
   node ai-command.js
   ```

2. Once the AI Assistant is running, you can execute tests by typing:
   ```
   execute this file with mcp server features/your-file.feature
   ```

3. Or simply:
   ```
   execute this file with mcp server
   ```
   The assistant will then ask you which file you want to execute.

4. CI/CD reports will be automatically generated after test execution in the `reports` folder.

### Example Commands

```
AI> execute this file with mcp server features/login.feature
```

```
AI> execute this file with mcp server
File path: features/login.feature
```

## Additional Options

### Running Tests Directly

If you prefer not to use the AI Assistant interface, you can run tests directly using:

- **Windows Batch**:
  ```
  run-mcp-ai.bat path/to/your-feature.feature
  ```

- **PowerShell**:
  ```
  .\run-mcp-ai.ps1 -featureFile path/to/your-feature.feature
  ```

- **Bash (Linux/Mac)**:
  ```
  ./run-mcp-ai.sh path/to/your-feature.feature
  ```

## GitHub Actions Integration

This package also includes GitHub Actions workflow files that automatically execute tests and generate reports in CI/CD pipelines:

- `githubaction.yml` - Main CI/CD workflow with MCP test integration
- `mcp-test-workflow.yml` - Dedicated workflow specifically for MCP testing

The workflows will automatically execute your tests and generate CI/CD reports whenever they're triggered.

## Support

For more information, refer to the MCP server documentation. 