/* global window, jasmine */
/* eslint strict: 0 */
(function () {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var trivialReporter = new jasmine.TrivialReporter();

  jasmineEnv.addReporter(trivialReporter);

  jasmineEnv.specFilter = function (spec) {
    return trivialReporter.specFilter(spec);
  };

  var currentWindowOnload = window.onload;
  var execJasmine = function () {
    jasmineEnv.execute();
  };
  window.onload = function () {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    execJasmine();
  };
}());
