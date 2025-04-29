@echo off
echo [94m🤖 AI Command: MCP Test Execution & Reporting[0m

:: Check if Node.js is installed
WHERE node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [91m❌ Node.js is not installed. Please install Node.js first.[0m
    exit /b 1
)

:: Display Node.js version
echo [92m✓ Node.js detected:[0m
node -v

:: Check for feature file parameter
set FEATURE_FILE=%1
if "%FEATURE_FILE%"=="" (
    echo [94mRunning all tests with MCP server...[0m
    node mcp-ai-command.js
) else (
    echo [94mRunning specific feature file with MCP server: %FEATURE_FILE%[0m
    node mcp-ai-command.js %FEATURE_FILE%
)

:: Check if execution was successful
IF %ERRORLEVEL% EQU 0 (
    echo.
    echo [92m✅ AI Command execution complete![0m
    echo [94mYou can view the test reports in the 'reports' folder.[0m
) ELSE (
    echo.
    echo [91m❌ AI Command execution failed![0m
)

pause 