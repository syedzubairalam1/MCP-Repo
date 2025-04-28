@echo off
echo Starting tests with Playwright MCP Server...

:: Set environment variable to indicate MCP server mode
set MCP_SERVER_MODE=true

:: Run the login feature tests
call npm run test:login

echo Tests completed!
pause 