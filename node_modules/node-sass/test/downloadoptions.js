var assert = require('assert'),
  ua = require('../scripts/util/useragent'),
  opts = require('../scripts/util/downloadoptions');


describe('util', function() {
  describe('downloadoptions', function() {
    describe('without a proxy', function() {
      it('should look as we expect', function() {
        var expected = {
          rejectUnauthorized: false,
          timeout: 60000,
          headers: {
            'User-Agent': ua(),
          },
          encoding: null,
        };

        assert.deepEqual(opts(), expected);
      });
    });

    describe('with an npm config proxy', function() {
      var proxy = 'http://test.proxy:1234';

      before(function() {
        process.env.npm_config_proxy = proxy;
      });

      after(function() {
        delete process.env.npm_config_proxy;
      });

      it('should look as we expect', function() {
        var expected = {
          rejectUnauthorized: false,
          proxy: proxy,
          timeout: 60000,
          headers: {
            'User-Agent': ua(),
          },
          encoding: null,
        };

        assert.deepEqual(opts(), expected);
      });
    });

    describe('with an env proxy proxy', function() {
      var proxy = 'http://test.proxy:1234';

      before(function() {
        process.env.HTTP_PROXY = proxy;
      });

      after(function() {
        delete process.env.HTTP_PROXY;
      });

      it('should look as we expect', function() {
        var expected = {
          rejectUnauthorized: false,
          timeout: 60000,
          headers: {
            'User-Agent': ua(),
          },
          encoding: null,
        };

        assert.deepEqual(opts(), expected);
      });
    });
  });
});
