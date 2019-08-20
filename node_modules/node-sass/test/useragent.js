var assert = require('assert'),
  pkg = require('../package.json'),
  ua = require('../scripts/util/useragent');

describe('util', function() {
  describe('useragent', function() {
    it('should look as we expect', function() {
      var reNode = 'node/' + process.version;
      var reSass = 'node-sass-installer/' + pkg.version;
      var reUA = new RegExp('^' + reNode + ' ' + reSass + '$');

      assert.ok(reUA.test(ua()));
    });
  });
});
