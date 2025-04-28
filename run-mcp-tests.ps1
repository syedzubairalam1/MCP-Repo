Write-Host "Starting Playwright MCP Server test execution..." -ForegroundColor Green

# Start the MCP server in a separate process
$mcpServerProcess = Start-Process -FilePath "npx" -ArgumentList "@executeautomation/playwright-mcp-server" -PassThru -NoNewWindow

# Give the server time to initialize
Write-Host "Waiting for MCP server to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Run the login tests
Write-Host "Running login feature tests..." -ForegroundColor Cyan
npx playwright-mcp-browser test:login

# Stop the MCP server when done
if ($mcpServerProcess) {
    Stop-Process -Id $mcpServerProcess.Id -Force
    Write-Host "MCP server stopped." -ForegroundColor Green
}

Write-Host "Test execution completed." -ForegroundColor Green 