#!/bin/bash

# Colors for console output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${CYAN}🤖 AI Command: MCP Test Execution & Reporting${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Display Node.js version
echo -e "${GREEN}✓ Node.js detected:${NC}"
node -v

# Check for feature file parameter
FEATURE_FILE=$1
if [ -z "$FEATURE_FILE" ]; then
    echo -e "${CYAN}Running all tests with MCP server...${NC}"
    node mcp-ai-command.js
else
    # Check if file exists
    if [ ! -f "$FEATURE_FILE" ]; then
        echo -e "${RED}❌ Feature file not found: $FEATURE_FILE${NC}"
        exit 1
    fi
    echo -e "${CYAN}Running specific feature file with MCP server: $FEATURE_FILE${NC}"
    node mcp-ai-command.js "$FEATURE_FILE"
fi

# Check if execution was successful
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ AI Command execution complete!${NC}"
    echo -e "${CYAN}You can view the test reports in the 'reports' folder.${NC}"
else
    echo -e "\n${RED}❌ AI Command execution failed!${NC}"
    exit 1
fi 