param (
    [string]$featureFile
)

Write-Host "🤖 AI Command: MCP Test Execution & Reporting" -ForegroundColor Cyan

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "✓ Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Run the MCP AI command script
if ($featureFile) {
    Write-Host "`nRunning specific feature file with MCP server: $featureFile" -ForegroundColor Cyan
    node mcp-ai-command.js $featureFile
} else {
    Write-Host "`nRunning all tests with MCP server..." -ForegroundColor Cyan
    node mcp-ai-command.js
}

# If the script execution was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ AI Command execution complete!" -ForegroundColor Green
    Write-Host "You can view the test reports in the 'reports' folder." -ForegroundColor Cyan
} else {
    Write-Host "`n❌ AI Command execution failed!" -ForegroundColor Red
} 