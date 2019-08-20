var assert = require('assert');
var hpack = require('../');
var fixtures = require('./fixtures');

describe('hpack/compressor', function() {
  var comp;

  beforeEach(function() {
    comp = hpack.compressor.create({
      table: {
        maxSize: 1024
      }
    });
  });

  function expect(arr, enc) {
    function isNumber(num) {
      return typeof num === 'number';
    }

    var out = comp.read().toString('hex');
    if (Array.isArray(arr) && !arr.every(isNumber)) {
      arr = arr.map(function(item) {
        return new Buffer(item, enc);
      });
      arr = Buffer.concat(arr);
    } else {
      arr = new Buffer(arr, enc);
    }
    var actual = arr.toString('hex');
    assert.equal(out, actual);
  }

  describe('indexed field', function() {
    it('should lookup entry from static table', function() {
      comp.write([{ name: ':method', value: 'GET' }]);
      expect([ 0b10000000 | 2 ]);
    });

    it('should fetch entry from the end of the static table', function() {
      comp.write([{ name: 'www-authenticate', value: '' }]);
      expect([ 0b10000000 | 61 ]);
    });
  });

  describe('literal field', function() {
    it('should lookup name in the table (incremental)', function() {
      comp.write([{ name: 'host', value: 'localhost' }]);
      expect('6686a0e41d139d09', 'hex');

      comp.write([{ name: 'host', value: 'localhost' }]);
      expect([ 0b10000000 | 62 ]);
    });

    it('should lookup name in the table (not-incremental)', function() {
      comp.write([{ name: 'host', value: 'localhost', incremental: false }]);
      expect('0f1786a0e41d139d09', 'hex');

      // Should not use the table
      comp.write([{ name: 'host', value: 'localhost' }]);
      expect('6686a0e41d139d09', 'hex');
    });

    it('should evict header field from the table', function() {
      for (var i = 0; i < 1000; i++) {
        comp.write([{ name: 'host', value: 'localhost' + i }]);
        comp.read();
      }

      assert(comp._table.size < comp._table.maxSize);
      assert.equal(comp._table.dynamic.length, 21);
    });
  });

  describe('update size', function() {
    it('should evict header field from the table', function() {
      comp.write([{ name: 'host', value: 'localhost' }]);
      expect('6686a0e41d139d09', 'hex');

      comp.reset();

      // update=0, update=maxSize
      expect('203fe107', 'hex');

      comp.write([{ name: 'host', value: 'localhost' }]);
      expect('6686a0e41d139d09', 'hex');
    });

    it('should send dynamic update if size >= protocolMaxSize', function() {
      comp.updateTableSize(Infinity);

      // update=maxSize
      expect('3fe107', 'hex');
    });
  });

  describe('spec examples', function() {
    beforeEach(function() {
      comp = hpack.compressor.create({
        table: {
          maxSize: 256
        }
      });
    });

    var tests = fixtures.specExamples;

    tests.forEach(function(test, i) {
      var prev = tests[i - 1];
      it('should give expected output on ' + test.id, function() {
        var startFrom = test.continuation ? prev.comp : comp;
        if (!startFrom)
          throw new Error('Previous test failed');
        comp = startFrom;

        comp.write(test.output.map(function(pair) {
          return { name: pair[0], value: pair[1], huffman: test.huffman };
        }));
        expect(test.input.replace(/ /g, ''), 'hex');

        // Verify table contents
        assert.deepEqual(comp._table.dynamic.map(function(header) {
          return [ header.name, header.value, header.totalSize ];
        }).reverse(), test.table);

        // Verify table size
        var expectedSize = test.table.reduce(function(acc, item) {
          return acc + item[2];
        }, 0);
        assert.equal(comp._table.size, expectedSize);

        test.comp = comp;
      });
    });
  });
});
