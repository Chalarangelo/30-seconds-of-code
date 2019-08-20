var assert = require('assert'),
  fs = require('fs'),
  exists = fs.existsSync,
  join = require('path').join,
  read = fs.readFileSync,
  sass = process.env.NODESASS_COV
      ? require('../lib-cov')
      : require('../lib'),
  readYaml = require('read-yaml'),
  mergeWith = require('lodash/mergeWith'),
  assign = require('lodash/assign'),
  glob = require('glob'),
  specPath = require('sass-spec').dirname.replace(/\\/g, '/'),
  impl = 'libsass',
  version = 3.5;

var normalize = function(str) {
  // This should be /\r\n/g, '\n', but there seems to be some empty line issues
  return str.replace(/\s+/g, '');
};

var inputs = glob.sync(specPath + '/**/input.*');

var initialize = function(inputCss, options) {
  var testCase = {};
  var folders = inputCss.split('/');
  var folder = join(inputCss, '..');
  testCase.folder = folder;
  testCase.name = folders[folders.length - 2];
  testCase.inputPath = inputCss;
  testCase.expectedPath = join(folder, 'expected_output.css');
  testCase.errorPath = join(folder, 'error');
  testCase.statusPath = join(folder, 'status');
  testCase.optionsPath = join(folder, 'options.yml');
  if (exists(testCase.optionsPath)) {
    options = mergeWith(assign({}, options), readYaml.sync(testCase.optionsPath), customizer);
  }
  testCase.includePaths = [
    folder,
    join(folder, 'sub')
  ];
  testCase.precision = parseFloat(options[':precision']) || 5;
  testCase.outputStyle = options[':output_style'] ? options[':output_style'].replace(':', '') : 'nested';
  testCase.todo = options[':todo'] !== undefined && options[':todo'] !== null && options[':todo'].indexOf(impl) !== -1;
  testCase.only = options[':only_on'] !== undefined && options[':only_on'] !== null && options[':only_on'];
  testCase.warningTodo = options[':warning_todo'] !== undefined && options[':warning_todo'] !== null && options[':warning_todo'].indexOf(impl) !== -1;
  testCase.startVersion = parseFloat(options[':start_version']) || 0;
  testCase.endVersion = parseFloat(options[':end_version']) || 99;
  testCase.options = options;
  testCase.result = false;

  // Probe filesystem once and cache the results
  testCase.shouldFail = exists(testCase.statusPath) && !fs.statSync(testCase.statusPath).isDirectory();
  testCase.verifyStderr = exists(testCase.errorPath) && !fs.statSync(testCase.errorPath).isDirectory();
  return testCase;
};

var runTest = function(inputCssPath, options) {
  var test = initialize(inputCssPath, options);

  it(test.name, function(done) {
    if (test.todo || test.warningTodo) {
      this.skip('Test marked with TODO');
    } else if (test.only && test.only.indexOf(impl) === -1) {
      this.skip('Tests marked for only: ' + test.only.join(', '));
    } else if (version < test.startVersion) {
      this.skip('Tests marked for newer Sass versions only');
    } else if (version > test.endVersion) {
      this.skip('Tests marked for older Sass versions only');
    } else {
      var expected = normalize(read(test.expectedPath, 'utf8'));
      sass.render({
        file: test.inputPath,
        includePaths: test.includePaths,
        precision: test.precision,
        outputStyle: test.outputStyle
      }, function(error, result) {
        if (test.shouldFail) {
          // Replace 1, with parseInt(read(test.statusPath, 'utf8')) pending
          // https://github.com/sass/libsass/issues/2162
          assert.equal(error.status, 1);
        } else if (test.verifyStderr) {
          var expectedError = read(test.errorPath, 'utf8');
          if (error === null) {
            // Probably a warning
            assert.ok(expectedError, 'Expected some sort of warning, but found none');
          } else {
            // The error messages seem to have some differences in areas
            // like line numbering, so we'll check the first line for the
            // general errror message only
            assert.equal(
              error.formatted.toString().split('\n')[0],
              expectedError.toString().split('\n')[0],
              'Should Error.\nOptions' + JSON.stringify(test.options));
          }
        } else if (expected) {
          assert.equal(
            normalize(result.css.toString()),
            expected,
            'Should equal with options ' + JSON.stringify(test.options)
          );
        }
        done();
      });
    }
  });
};

var specSuite = {
  name: specPath.split('/').slice(-1)[0],
  folder: specPath,
  tests: [],
  suites: [],
  options: {}
};

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

var executeSuite = function(suite, tests) {
  var suiteFolderLength = suite.folder.split('/').length;
  var optionsFile = join(suite.folder, 'options.yml');
  if (exists(optionsFile)) {
    suite.options = mergeWith(assign({}, suite.options), readYaml.sync(optionsFile), customizer);
  }

  // Push tests in the current suite
  tests = tests.filter(function(test) {
    var testSuiteFolder = test.split('/');
    var inputSass = testSuiteFolder[suiteFolderLength + 1];
    // Add the test if the specPath matches the testname
    if (inputSass === 'input.scss' || inputSass === 'input.sass') {
      suite.tests.push(test);
    } else {
      return test;
    }
  });

  if (tests.length !== 0) {
    var prevSuite = tests[0].split('/')[suiteFolderLength];
    var suiteName = '';
    var prevSuiteStart = 0;
    for (var i = 0; i < tests.length; i++) {
      var test = tests[i];
      suiteName = test.split('/')[suiteFolderLength];
      if (suiteName !== prevSuite) {
        suite.suites.push(
          executeSuite(
            {
              name: prevSuite,
              folder: suite.folder + '/' + prevSuite,
              tests: [],
              suites: [],
              options: assign({}, suite.options),
            },
            tests.slice(prevSuiteStart, i)
          )
        );
        prevSuite = suiteName;
        prevSuiteStart = i;
      }
    }
    suite.suites.push(
      executeSuite(
        {
          name: suiteName,
          folder: suite.folder + '/' + suiteName,
          tests: [],
          suites: [],
          options: assign({}, suite.options),
        },
        tests.slice(prevSuiteStart, tests.length)
      )
    );
  }
  return suite;
};
var allSuites = executeSuite(specSuite, inputs);
var runSuites = function(suite) {
  describe(suite.name, function(){
    suite.tests.forEach(function(test){
      runTest(test, suite.options);
    });
    suite.suites.forEach(function(subsuite) {
      runSuites(subsuite);
    });
  });
};
runSuites(allSuites);
