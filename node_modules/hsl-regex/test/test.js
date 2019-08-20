var assert = require('assert');
var hslRegex = require('..');

var hslStrings = [
  'hsl(111, 12.343%, 0.9%)',
  'hsl(123, 45%, 67%)',
  'hsl(1, 1.111%, 1.1111%)',
  'hsl(1, .111%, .1111%)'
];

var inexactHslStrings = [
  'hsl(,,,)',
  'hsl(12,,)',
  'hsl(1, 1.111%, 1.1111%) ',
  '   hSl(1, 1.111%, 1.1111%)',
  'hsla(1, .111%, .1111%, .9)'
];

describe('hsl-regex', function() {

  describe('exact: true', function() {

    it('should return a regex that matches exact hsl strings', function() {
      hslStrings.forEach(function(hsl) {
        assert.ok(hslRegex({ exact: true }).test(hsl));
      });
    });

    it('should return a regex that does not match invalid hsl strings', function() {
      inexactHslStrings.forEach(function(invalidHsl) {
        assert.ok(!hslRegex({ exact: true }).test(invalidHsl));
      });
    });
  });

  describe('g', function() {

    it('should match hsl strings', function() {
      assert.deepEqual(
        hslStrings.join('foobar').match(hslRegex()),
        hslStrings
      )
    });

    it('should not match non hsl strings', function() {
      assert.deepEqual(
        inexactHslStrings.join('foobar').match(hslRegex()),
        ['hsl(1, 1.111%, 1.1111%)', 'hSl(1, 1.111%, 1.1111%)']
      );
    });
  });
});
