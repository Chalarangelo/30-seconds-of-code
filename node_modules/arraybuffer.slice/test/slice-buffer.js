/*
 * Test dependencies
 */

var sliceBuffer = require('../index.js');
var expect = require('expect.js');

/**
 * Tests
 */

describe('sliceBuffer', function() {
  describe('using standard slice', function() {
    it('should slice correctly with only start provided', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }

      var sliced = sliceBuffer(abv.buffer, 3);
      var sabv = new Uint8Array(sliced);
      for (var i = 3, ii = 0; i < abv.length; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with start and end provided', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }

      var sliced = sliceBuffer(abv.buffer, 3, 8);
      var sabv = new Uint8Array(sliced);
      for (var i = 3, ii = 0; i < 8; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with negative start', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }

      var sliced = sliceBuffer(abv.buffer, -3);
      var sabv = new Uint8Array(sliced);
      for (var i = abv.length - 3, ii = 0; i < abv.length; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with negative end', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }

      var sliced = sliceBuffer(abv.buffer, 0, -3);
      var sabv = new Uint8Array(sliced);
      for (var i = 0, ii = 0; i < abv.length - 3; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with negative start and end', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }

      var sliced = sliceBuffer(abv.buffer, -6, -3);
      var sabv = new Uint8Array(sliced);
      for (var i = abv.length - 6, ii = 0; i < abv.length - 3; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with equal start and end', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }

      var sliced = sliceBuffer(abv.buffer, 1, 1);
      expect(sliced.byteLength).to.equal(0);
    });
    
    it('should slice correctly when end larger than buffer', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }

      var sliced = sliceBuffer(abv.buffer, 0, 100);
      expect(new Uint8Array(sliced)).to.eql(abv);
    });

    it('shoud slice correctly when start larger than end', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }

      var sliced = sliceBuffer(abv.buffer, 6, 5);
      expect(sliced.byteLength).to.equal(0);
    });
  });

  describe('using fallback', function() {
    it('should slice correctly with only start provided', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }
      var ab = abv.buffer;
      ab.slice = undefined;

      var sliced = sliceBuffer(ab, 3);
      var sabv = new Uint8Array(sliced);
      for (var i = 3, ii = 0; i < abv.length; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with start and end provided', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }
      var ab = abv.buffer;
      ab.slice = undefined;


      var sliced = sliceBuffer(ab, 3, 8);
      var sabv = new Uint8Array(sliced);
      for (var i = 3, ii = 0; i < 8; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with negative start', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }
      var ab = abv.buffer;
      ab.slice = undefined;


      var sliced = sliceBuffer(ab, -3);
      var sabv = new Uint8Array(sliced);
      for (var i = abv.length - 3, ii = 0; i < abv.length; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with negative end', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }
      var ab = abv.buffer;
      ab.slice = undefined;

      var sliced = sliceBuffer(ab, 0, -3);
      var sabv = new Uint8Array(sliced);
      for (var i = 0, ii = 0; i < abv.length - 3; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with negative start and end', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }
      var ab = abv.buffer;
      ab.slice = undefined;

      var sliced = sliceBuffer(ab, -6, -3);
      var sabv = new Uint8Array(sliced);
      for (var i = abv.length - 6, ii = 0; i < abv.length - 3; i++, ii++) {
        expect(abv[i]).to.equal(sabv[ii]);
      }
    });

    it('should slice correctly with equal start and end', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }
      var ab = abv.buffer;
      ab.slice = undefined;

      var sliced = sliceBuffer(ab, 1, 1);
      expect(sliced.byteLength).to.equal(0);
    });

    it('should slice correctly when end larger than buffer', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }
      var ab = abv.buffer;
      ab.slice = undefined;

      var sliced = sliceBuffer(ab, 0, 100);
      var sabv = new Uint8Array(sliced);
      for (var i = 0; i < abv.length; i++) {
        expect(abv[i]).to.equal(sabv[i]);
      }
    });

    it('shoud slice correctly when start larger than end', function() {
      var abv = new Uint8Array(10);
      for (var i = 0; i < abv.length; i++) {
        abv[i] = i;
      }
      var ab = abv.buffer;
      ab.slice = undefined;

      var sliced = sliceBuffer(ab, 6, 5);
      expect(sliced.byteLength).to.equal(0);
    });
  });
});
