@echo off
echo Starting Playwright MCP Server and running tests...

:: Set environment variable to indicate MCP server mode
set MCP_SERVER_MODE=true

:: Start the MCP server and run the login tests
npx @executeautomation/playwright-mcp-server -- npm run test:login

echo Tests completed!
pause 