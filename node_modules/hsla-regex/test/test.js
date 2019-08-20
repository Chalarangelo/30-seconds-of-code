var assert = require('assert');
var hslaRegex = require('..');

var hslaStrings = [
  'hsla(111, 12.343%, 0.9%, .1)',
  'hsla(123, 45%, 67%, 1)',
  'hsla(1, 1.111%, 1.1111%, .4)',
  'hsla(1, .111%, .1111%, .123456)'
];

var inexactHslaStrings = [
  'hsla(,,,)',
  'hsla(12,,,)',
  'hsla(1, 1.111%, 1.1111%, .123) ',
  '   hSla(1, 1.111%, 1.1111%, 1)',
  'hsl(1, .111%, .1111%)'
];

describe('hsla-regex', function() {

  describe('exact: true', function() {

    it('should return a regex that matches exact hsla strings', function() {
      hslaStrings.forEach(function(hsla) {
        assert.ok(hslaRegex({ exact: true }).test(hsla));
      });
    });

    it('should return a regex that does not match invalid hsla strings', function() {
      inexactHslaStrings.forEach(function(invalidHsl) {
        assert.ok(!hslaRegex({ exact: true }).test(invalidHsl));
      });
    });
  });

  describe('g', function() {

    it('should match hsla strings', function() {
      assert.deepEqual(
        hslaStrings.join('foobar').match(hslaRegex()),
        hslaStrings
      )
    });

    it('should not match non hsla strings', function() {
      assert.deepEqual(
        inexactHslaStrings.join('foobar').match(hslaRegex()),
        ['hsla(1, 1.111%, 1.1111%, .123)', 'hSla(1, 1.111%, 1.1111%, 1)']
      );
    });
  });
});
