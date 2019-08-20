/*eslint new-cap: ["error", {"capIsNewExceptions": ["Color"]}]*/

var assert = require('assert'),
  path = require('path'),
  etx = require('../lib/extensions'),
  binding = process.env.NODESASS_COV
      ? require('../lib-cov/binding')
      : require('../lib/binding');

describe('binding', function() {
  describe('missing error', function() {
    it('should be useful', function() {
      process.env.SASS_BINARY_NAME = 'unknown-x64-48';

      assert.throws(
        function() { binding(etx); },
        function(err) {
          var re = new RegExp('Missing binding.*?\\' + path.sep + 'vendor\\' + path.sep);
          if ((err instanceof Error)) {
            return re.test(err);
          }
        }
      );
    });

    it('should list currently installed bindings', function() {
      assert.throws(
        function() { binding(etx); },
        function(err) {
          var etx = require('../lib/extensions');

          delete process.env.SASS_BINARY_NAME;

          if ((err instanceof Error)) {
            return err.message.indexOf(
              etx.getHumanEnvironment(etx.getBinaryName())
            ) !== -1;
          }
        }
      );
    });
  });

  describe('on unsupported environment', function() {
    describe('with an unsupported architecture', function() {
      beforeEach(function() {
        Object.defineProperty(process, 'arch', {
          value: 'foo',
        });
      });

      afterEach(function() {
        Object.defineProperty(process, 'arch', {
          value: 'x64',
        });
      });

      it('should error', function() {
        assert.throws(
          function() { binding(etx); },
          'Node Sass does not yet support your current environment'
        );
      });

      it('should inform the user the architecture is unsupported', function() {
        assert.throws(
          function() { binding(etx); },
          'Unsupported architecture (foo)'
        );
      });
    });

    describe('with an unsupported platform', function() {
      beforeEach(function() {
        Object.defineProperty(process, 'platform', {
          value: 'bar',
        });
      });

      afterEach(function() {
        Object.defineProperty(process, 'platform', {
          value: 'darwin',
        });
      });

      it('should error', function() {
        assert.throws(
          function() { binding(etx); },
          'Node Sass does not yet support your current environment'
        );
      });

      it('should inform the user the platform is unsupported', function() {
        assert.throws(
          function() { binding(etx); },
          'Unsupported platform (bar)'
        );
      });
    });

    describe('with an unsupported runtime', function() {
      beforeEach(function() {
        Object.defineProperty(process.versions, 'modules', {
          value: 'baz',
        });
      });

      afterEach(function() {
        Object.defineProperty(process.versions, 'modules', {
          value: 51,
        });
      });

      it('should error', function() {
        assert.throws(
          function() { binding(etx); },
          'Node Sass does not yet support your current environment'
        );
      });

      it('should inform the user the runtime is unsupported', function() {
        assert.throws(
          function() { binding(etx); },
          'Unsupported runtime (baz)'
        );
      });
    });
  });
});
