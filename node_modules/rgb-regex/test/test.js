var assert = require('assert');
var rgbRegex = require('..');

var rgbStrings = [
  'rgb(12,34,56)',
  'rgb(255, 255,      255)',
  'rgb(1,   1,1)'
];

var inexactRgbStrings = [
  'rgb(,,)',
  'rGb(12,34,56)',
  'rgb(12, 34, 200) ',
  '   rgb(12,34,56)',
  'rgb(1,2,)'
];

describe('rgb-regex', function() {

  describe('exact: true', function() {

    it('should return a regex that matches exact rgb strings', function() {
      rgbStrings.forEach(function(rgb) {
        assert.ok(rgbRegex({ exact: true }).test(rgb));
      });
    });

    it('should return a regex that does not match invalid rgb strings', function() {
      inexactRgbStrings.forEach(function(invalidRgb) {
        assert.ok(!rgbRegex({ exact: true }).test(invalidRgb));
      });
    });
  });

  describe('g', function() {

    it('should match rgb strings', function() {
      assert.deepEqual(
        rgbStrings.join('foobar').match(rgbRegex()),
        rgbStrings
      )
    });

    it('should not match non rgb strings', function() {
      assert.deepEqual(
        inexactRgbStrings.join('foobar').match(rgbRegex()),
        ['rGb(12,34,56)', 'rgb(12, 34, 200)', 'rgb(12,34,56)']
      );
    });
  });
});
