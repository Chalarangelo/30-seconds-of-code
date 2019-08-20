var assert = require('assert'),
  path = require('path'),
  errors = require('../lib/errors');

describe('binary errors', function() {

  function getCurrentPlatform() {
    if (process.platform === 'win32') {
      return 'Windows';
    } else if (process.platform === 'darwin') {
      return 'OS X';
    }
    return '';
  }

  function getCurrentArchitecture() {
    if (process.arch === 'x86' || process.arch === 'ia32') {
      return '32-bit';
    } else if (process.arch === 'x64') {
      return '64-bit';
    }
    return '';
  }

  function getCurrentEnvironment() {
    return getCurrentPlatform() + ' ' + getCurrentArchitecture();
  }

  describe('for an unsupported environment', function() {
    it('identifies the current environment', function() {
      var message = errors.unsupportedEnvironment();
      assert.ok(message.indexOf(getCurrentEnvironment()) !== -1);
    });

    it('links to supported environment documentation', function() {
      var message = errors.unsupportedEnvironment();
      assert.ok(message.indexOf('https://github.com/sass/node-sass/releases/tag/v') !== -1);
    });
  });

  describe('for an missing binary', function() {
    it('identifies the current environment', function() {
      var message = errors.missingBinary();
      assert.ok(message.indexOf(getCurrentEnvironment()) !== -1);
    });

    it('documents the expected binary location', function() {
      var message = errors.missingBinary();
      assert.ok(message.indexOf(path.sep + 'vendor' + path.sep) !== -1);
    });
  });

});
