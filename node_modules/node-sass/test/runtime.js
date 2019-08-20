var assert = require('assert'),
  sass = process.env.NODESASS_COV
      ? require('../lib-cov/extensions')
      : require('../lib/extensions');

describe('runtime parameters', function() {
  var pkg = require('../package'),
        // Let's use JSON to fake a deep copy
    savedArgv = JSON.stringify(process.argv),
    savedEnv = JSON.stringify(process.env);

  afterEach(function() {
    process.argv = JSON.parse(savedArgv);
    process.env = JSON.parse(savedEnv);
    delete pkg.nodeSassConfig;
  });

  describe('configuration precedence should be respected', function() {

    describe('SASS_BINARY_NAME', function() {
      beforeEach(function() {
        process.argv.push('--sass-binary-name', 'aaa');
        process.env.SASS_BINARY_NAME = 'bbb';
        process.env.npm_config_sass_binary_name = 'ccc';
        pkg.nodeSassConfig = { binaryName: 'ddd' };
      });

      it('command line argument', function() {
        assert.equal(sass.getBinaryName(), 'aaa_binding.node');
      });

      it('environment variable', function() {
        process.argv = [];
        assert.equal(sass.getBinaryName(), 'bbb_binding.node');
      });

      it('npm config variable', function() {
        process.argv = [];
        process.env.SASS_BINARY_NAME = null;
        assert.equal(sass.getBinaryName(), 'ccc_binding.node');
      });

      it('package.json', function() {
        process.argv = [];
        process.env.SASS_BINARY_NAME = null;
        process.env.npm_config_sass_binary_name = null;
        assert.equal(sass.getBinaryName(), 'ddd_binding.node');
      });
    });

    describe('SASS_BINARY_SITE', function() {
      beforeEach(function() {
        process.argv.push('--sass-binary-site', 'http://aaa.example.com:9999');
        process.env.SASS_BINARY_SITE = 'http://bbb.example.com:8888';
        process.env.npm_config_sass_binary_site = 'http://ccc.example.com:7777';
        pkg.nodeSassConfig = { binarySite: 'http://ddd.example.com:6666' };
      });

      it('command line argument', function() {
        var URL = 'http://aaa.example.com:9999';
        assert.equal(sass.getBinaryUrl().substr(0, URL.length), URL);
      });

      it('environment variable', function() {
        process.argv = [];
        var URL = 'http://bbb.example.com:8888';
        assert.equal(sass.getBinaryUrl().substr(0, URL.length), URL);
      });

      it('npm config variable', function() {
        process.argv = [];
        process.env.SASS_BINARY_SITE = null;
        var URL = 'http://ccc.example.com:7777';
        assert.equal(sass.getBinaryUrl().substr(0, URL.length), URL);
      });

      it('package.json', function() {
        process.argv = [];
        process.env.SASS_BINARY_SITE = null;
        process.env.npm_config_sass_binary_site = null;
        var URL = 'http://ddd.example.com:6666';
        assert.equal(sass.getBinaryUrl().substr(0, URL.length), URL);
      });
    });

    describe('SASS_BINARY_DIR', function() {
      beforeEach(function() {
        process.argv.push('--sass-binary-dir', 'aaa');
        process.env.SASS_BINARY_DIR = 'bbb';
        process.env.npm_config_sass_binary_dir = 'ccc';
        pkg.nodeSassConfig = { binaryDir: 'ddd' };
      });

      it('command line argument', function() {
        assert.equal(sass.getBinaryDir(), 'aaa');
      });

      it('environment variable', function() {
        process.argv = [];
        assert.equal(sass.getBinaryDir(), 'bbb');
      });

      it('npm config variable', function() {
        process.argv = [];
        process.env.SASS_BINARY_DIR = null;
        assert.equal(sass.getBinaryDir(), 'ccc');
      });

      it('package.json', function() {
        process.argv = [];
        process.env.SASS_BINARY_DIR = null;
        process.env.npm_config_sass_binary_dir = null;
        assert.equal(sass.getBinaryDir(), 'ddd');
      });
    });

    describe('SASS_BINARY_PATH', function() {
      beforeEach(function() {
        process.argv.push('--sass-binary-path', 'aaa_binding.node');
        process.env.SASS_BINARY_PATH = 'bbb_binding.node';
        process.env.npm_config_sass_binary_path = 'ccc_binding.node';
        pkg.nodeSassConfig = { binaryPath: 'ddd_binding.node' };
      });

      it('command line argument', function() {
        assert.equal(sass.getBinaryPath(), 'aaa_binding.node');
      });

      it('environment variable', function() {
        process.argv = [];
        assert.equal(sass.getBinaryPath(), 'bbb_binding.node');
      });

      it('npm config variable', function() {
        process.argv = [];
        process.env.SASS_BINARY_PATH = null;
        assert.equal(sass.getBinaryPath(), 'ccc_binding.node');
      });

      it('package.json', function() {
        process.argv = [];
        process.env.SASS_BINARY_PATH = null;
        process.env.npm_config_sass_binary_path = null;
        assert.equal(sass.getBinaryPath(), 'ddd_binding.node');
      });
    });

  });

  describe.skip('Sass Binary Cache', function() {
    var npmCacheDir;
    before(function() {
      npmCacheDir = process.env.npm_config_cache;
    });

    beforeEach(function() {
      delete process.env.npm_config_sass_binary_cache;
    });

    it('npm config variable', function() {
      var overridenCachePath = '/foo/bar/';
      process.env.npm_config_sass_binary_cache = overridenCachePath;
      assert.equal(sass.getCachePath(), overridenCachePath);
    });

    it('With no value, falls back to NPM cache', function() {
      assert.equal(sass.getCachePath(), npmCacheDir);
    });
  });
});

// describe('library detection', function() {
//   it('should throw error when libsass binary is missing.', function() {
//     var sass = require(extensionsPath),
//         originalBin = sass.getBinaryPath(),
//         renamedBin = [originalBin, '_moved'].join('');

//     assert.throws(function() {
//       fs.renameSync(originalBin, renamedBin);
//       sass.getBinaryPath(true);
//     }, /The `libsass` binding was not found/);

//     fs.renameSync(renamedBin, originalBin);
//   });
// });
