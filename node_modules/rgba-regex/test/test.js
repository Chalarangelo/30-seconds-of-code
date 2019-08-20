var assert = require('assert');
var rgbaRegex = require('..');

var rgbaStrings = [
  'rgba(12,34,56, 1)',
  'rgba(255, 255,      255, .9)',
  'rgba(1,   1,1, 0.2)'
];

var inexactRgbaStrings = [
  'rgba(,,,)',
  'rGba(12,34,56,1)',
  'rgba(12, 34, 200,1) ',
  '   rgba(12,34,56,1)',
  'rgba(1,2,,)'
];

describe('rgba-regex', function() {

  describe('exact: true', function() {

    it('should return a regex that matches exact rgba strings', function() {
      rgbaStrings.forEach(function(rgba) {
        assert.ok(rgbaRegex({ exact: true }).test(rgba));
      });
    });

    it('should return a regex that does not match invalid rgba strings', function() {
      inexactRgbaStrings.forEach(function(invalidRgba) {
        assert.ok(!rgbaRegex({ exact: true }).test(invalidRgba));
      });
    });
  });

  describe('g', function() {

    it('should match rgba strings', function() {
      assert.deepEqual(
        rgbaStrings.join('foobar').match(rgbaRegex()),
        rgbaStrings
      )
    });

    it('should not match non rgba strings', function() {
      assert.deepEqual(
        inexactRgbaStrings.join('foobar').match(rgbaRegex()),
        ['rGba(12,34,56,1)', 'rgba(12, 34, 200,1)', 'rgba(12,34,56,1)']
      );
    });
  });
});
