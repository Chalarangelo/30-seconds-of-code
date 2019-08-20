process.env.NODESASS_COV ? require('../lib-cov') : require('../lib');

var assert = require('assert'),
  sass = require('../lib/extensions'),
  binding = require(sass.getBinaryPath());

describe('lowlevel', function() {
  it('fail with options not an object', function(done) {
    var options =  2;
    assert.throws(function() {
      binding.renderSync(options);
    }, /"result" element is not an object/);
    done();
  });

  it('data context with options.data not provided', function(done) {
    var options =  {
      /* data: */
      sourceComments: false,
      file: null,
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      indentWidth: 2,
      indentType: 0,
      linefeed: '\n',
      result: { stats: {} } };

    binding.renderSync(options);
    assert(/Data context created without a source string/.test(options.result.error),
          'Should fail with error message "Data context created without a source string"');
    done();
  });

  it('data context with both options.data and options.file not provided', function(done) {
    var options =  {
      /* data: */
      sourceComments: false,
      /* file: null, */
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      indentWidth: 2,
      indentType: 0,
      linefeed: '\n',
      result: { stats: {} } };

    binding.renderSync(options);
    assert(/Data context created without a source string/.test(options.result.error),
          'Should fail with error message "Data context created without a source string"');
    done();
  });

  it('file context with both options.data and options.file not provided', function(done) {
    var options =  {
      /* data: */
      sourceComments: false,
      /* file: null, */
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      indentWidth: 2,
      indentType: 0,
      linefeed: '\n',
      result: { stats: {} } };

    binding.renderFileSync(options);
    assert(/File context created without an input path/.test(options.result.error),
          'Should fail with error message "File context created without an input path"');
    done();
  });

  it('file context with options.file not provided, options.data given', function(done) {
    var options =  {
      data: 'div { width: 10px; } ',
      sourceComments: false,
      /* file: null, */
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      indentWidth: 2,
      indentType: 0,
      linefeed: '\n',
      result: { stats: {} } };

    binding.renderFileSync(options);
    assert(/File context created without an input path/.test(options.result.error),
          'Should fail with error message "File context created without an input path"');
    done();
  });

  it('fail with options.result not provided', function(done) {
    var options =  { data: 'div { width: 10px; } ',
      sourceComments: false,
      file: null,
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      indentWidth: 2,
      indentType: 0,
      linefeed: '\n' };

    assert.throws(function() {
      binding.renderSync(options);
    }, /"result" element is not an object/);
    done();
  });


  it('fail with options.result not an object', function(done) {
    var options =  { data: 'div { width: 10px; } ',
      sourceComments: false,
      file: null,
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      indentWidth: 2,
      indentType: 0,
      linefeed: '\n',
      result: 2 };

    assert.throws(function() {
      binding.renderSync(options);
    }, /"result" element is not an object/);
    done();
  });


  it('fail with options.result.stats not provided', function(done) {

    var options =  { data: 'div { width: 10px; } ',
      sourceComments: false,
      file: null,
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      indentWidth: 2,
      indentType: 0,
      linefeed: '\n',
      result: {} };

    assert.throws(function() {
      binding.renderSync(options);
    }, /"result.stats" element is not an object/);
    done();
  });

  it('fail with options.result.stats not an object', function(done) {

    var options =  { data: 'div { width: 10px; } ',
      sourceComments: false,
      file: null,
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      indentWidth: 2,
      indentType: 0,
      linefeed: '\n',
      result: { stats: 2 } };

    assert.throws(function() {
      binding.renderSync(options);
    }, /"result.stats" element is not an object/);
    done();
  });

  it('options.indentWidth not provided', function(done) {
    var options =  { data: 'div { width: 10px; }',
      sourceComments: false,
      file: null,
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      /* indentWidth */
      indentType: 0,
      linefeed: '\n',
      result: { stats: {} } };

    binding.renderSync(options);
    assert(options.result.css);
    done();
  });

  it('empty data string', function(done) {
    var options =  { data: '',
      sourceComments: false,
      file: null,
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      /* indentWidth */
      indentType: 0,
      linefeed: '\n',
      result: { stats: {} } };

    binding.renderSync(options);
    assert(/empty source string/.test(options.result.error),
          'Should fail with error message "Data context created with empty source string"');
    done();
  });


  it('empty file string', function(done) {
    var options =  {
      sourceComments: false,
      file: '',
      outFile: null,
      includePaths: '',
      precision: 5,
      sourceMap: null,
      style: 0,
      /* indentWidth */
      indentType: 0,
      linefeed: '\n',
      result: { stats: {} } };

    binding.renderFileSync(options);
    assert(/empty input path/.test(options.result.error),
          'Should fail with error message "File context created with empty input path"');
    done();
  });

}); // lowlevel
