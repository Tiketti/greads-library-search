module.exports = (config) => {
  config.set({
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
    ],
    plugins: [
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-spec-reporter',
    ],
    files: [
      'options/options.js',
      'options/*.spec.js',
      'script.spec.js',
      'script.js',
    ],
    browsers: [],
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'kjhtml'],
    specReporter: {
      suppressErrorSummary: true, // do not print error summary
      suppressSkipped: true,      // do not print information about skipped tests
    },
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
  });
};
