var assert = require('assert'),
  proxy = require('../../../scripts/util/proxy');

describe('proxy', function() {
  var oldEnvironment;

  beforeEach(function() {
    oldEnvironment = process.env;
  });

  afterEach(function() {
    process.env = oldEnvironment;
  });

  describe('without an npm proxy config', function() {
    delete process.env.npm_config_https_proxy;
    delete process.env.npm_config_proxy;
    delete process.env.npm_config_http_proxy;

    it('should return an empty string', function() {
      assert.strictEqual('', proxy());
    });

    it('should ignore system proxy environment variables', function() {
      process.env.HTTPS_PROXY = 'http://https_proxy.com';
      process.env.PROXY = 'http://proxy.com';
      process.env.HTTP_PROXY = 'http://http_proxy.com';

      assert.strictEqual('', proxy());
    });
  });

  describe('with an npm proxy config', function() {
    beforeEach(function() {
      process.env.npm_config_https_proxy = 'http://https_proxy.com';
      process.env.npm_config_proxy = 'http://proxy.com';
      process.env.npm_config_http_proxy = 'http://http_proxy.com';
    });

    describe('https_proxy', function() {
      it('should have the highest precedence', function() {
        assert.strictEqual(process.env.npm_config_https_proxy, proxy());
      });
    });

    describe('proxy', function() {
      it('should have the higher precedence than https_proxy', function() {
        assert.strictEqual(process.env.npm_config_https_proxy, proxy());
        delete process.env.npm_config_https_proxy;

        assert.strictEqual(process.env.npm_config_proxy, proxy());
      });

      it('should have the lower precedence than http_proxy', function() {
        delete process.env.npm_config_https_proxy;

        assert.strictEqual(process.env.npm_config_proxy, proxy());
        delete process.env.npm_config_proxy;

        assert.strictEqual(process.env.npm_config_http_proxy, proxy());
      });
    });

    describe('http_proxy', function() {
      it('should have the lowest precedence', function() {
        assert.strictEqual(process.env.npm_config_https_proxy, proxy());
        delete process.env.npm_config_https_proxy;

        assert.strictEqual(process.env.npm_config_proxy, proxy());
        delete process.env.npm_config_proxy;

        assert.strictEqual(process.env.npm_config_http_proxy, proxy());
      });
    });
  });
});