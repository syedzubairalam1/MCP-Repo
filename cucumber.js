module.exports = {
  default: {
    paths: ['features/*.feature', '*.feature'],
    require: [
      'tests/step_definitions/*.js', 
      'tests/support/*.js',
      'tests/support/reporting/*.js'
    ],
    requireModule: [],
    format: [
      'html:reports/cucumber-report.html', 
      'json:reports/cucumber-report.json',
      'summary',
      'progress'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    timeout: 30000
  }
}; 