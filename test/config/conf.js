const suites = require('./specs');

exports.config = {
  seleniumAddress: 'http://192.168.99.100:4444/wd/hub',

  suites,
  SELENIUM_PROMISE_MANAGER: false,

  chromeOnly: true,
  allScriptsTimeout: 60000,
  getPageTimeout: 60000,
  defaultTimeoutInterval: 30000,

  capabilities: {
    tz: 'UTC',
    shardTestFiles: true,
    maxInstances: 2,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['start-maximized']
    }
  },

  params: {
    DEFAULT_TIMEOUT: 20000,
    baseurl: 'http://192.168.56.1:3000',
    login: {
      account: 'test',
      password: 'test',
    }
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
      require: [
        '../specs/functional/**/*.js',
      ],
      tags: [],                      // <string[]> (expression) only execute the features or scenarios with tags matching the expression
      strict: true,                  // <boolean> fail if there are any undefined or pending steps
      'dry-run': false,              // <boolean> invoke formatters without executing steps
      compiler: [],                   // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    },

  onPrepare: async () => {
    await browser.waitForAngularEnabled(false);
    const {Given, Then, When, Before, After} = require('cucumber');
    global.Given = Given;
    global.When = When;
    global.Then = Then;
    global.Before = Before;
    global.After = After;
  }
};
