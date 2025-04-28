const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Define options for cucumber HTML reporter
const options = {
  theme: 'bootstrap',
  jsonFile: path.join(process.cwd(), 'reports/cucumber-report.json'),
  output: path.join(process.cwd(), 'reports/cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': 'Gather Login Test',
    'Test Environment': 'Test',
    'Browser': 'Chrome',
    'Platform': process.platform,
    'Parallel': 'Scenarios',
    'Executed': 'Local'
  },
  failedSummaryReport: true,
};

// Generate HTML report
function generateReport() {
  if (fs.existsSync(options.jsonFile)) {
    reporter.generate(options);
    console.log('Cucumber HTML report generated successfully!');
  } else {
    console.error('JSON report file not found. Make sure tests are run with the correct reporter options.');
  }
}

module.exports = {
  generateReport
}; 