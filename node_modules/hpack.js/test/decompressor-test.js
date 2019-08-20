var assert = require('assert');
var hpack = require('../');
var fixtures = require('./fixtures');

describe('hpack/decompressor', function() {
  var decomp;

  beforeEach(function() {
    decomp = hpack.decompressor.create({
      table: {
        maxSize: 1024
      }
    });
  });

  describe('indexed field', function() {
    it('should fail on 0-index', function(cb) {
      decomp.write(new Buffer([ 0b10000000 ]));
      decomp.execute(function(err) {
        assert(/zero index/i.test(err.message), err.message);
        cb();
      });
    });

    it('should fetch entry from static table', function() {
      decomp.write(new Buffer([ 0b10000000 | 2 ]));
      decomp.execute();
      var field = decomp.read();
      assert.equal(field.name, ':method');
      assert.equal(field.value, 'GET');
    });

    it('should fetch entry from the end of the static table', function() {
      decomp.write(new Buffer([ 0b10000000 | 61 ]));
      decomp.execute();
      var field = decomp.read();
      assert.equal(field.name, 'www-authenticate');
      assert.equal(field.value, '');
    });

    it('should fail on OOB-index', function(cb) {
      decomp.write(new Buffer([ 0b11000000 ]));
      decomp.execute(function(err) {
        assert(/field oob/i.test(err.message), err.message);
        cb();
      });
    });
  });

  describe('literal field', function() {
    it('should lookup name in the table (incremental)', function() {
      var value = new Buffer('localhost');
      var header = new Buffer([
        0b01000000 | 38,  // 38th element from static table
        value.length
      ]);
      decomp.write(Buffer.concat([ header, value ]));
      decomp.execute();

      var field = decomp.read();
      assert.equal(field.name, 'host');
      assert.equal(field.value, 'localhost');

      decomp.write(new Buffer([ 0b10000000 | 62 ]));
      decomp.execute();
      var field = decomp.read();
      assert.equal(field.name, 'host');
      assert.equal(field.value, 'localhost');
    });

    it('should lookup name in the table (not-incremental)', function(cb) {
      var value = new Buffer('localhost');
      var header = new Buffer([
        0b00001111,
        0b00000000 | 23,
        value.length
      ]);
      decomp.write(Buffer.concat([ header, value ]));
      decomp.execute();

      var field = decomp.read();
      assert.equal(field.name, 'host');
      assert.equal(field.value, 'localhost');

      decomp.write(new Buffer([ 0b10000000 | 62 ]));
      decomp.execute(function(err) {
        assert(/field oob/i.test(err.message), err.message);
        cb();
      });
    });

    it('should evict header field from the table', function() {
      var value = new Buffer('localhost');
      var header = new Buffer([
        0b01000000 | 38,  // 38th element from static table
        value.length
      ]);
      for (var i = 0; i < 1000; i++) {
        decomp.write(Buffer.concat([ header, value ]));
        decomp.execute();
        var field = decomp.read();
        assert.equal(field.name, 'host');
        assert.equal(field.value, 'localhost');
      }

      assert(decomp._table.size < decomp._table.maxSize);
      assert.equal(decomp._table.dynamic.length, 22);
    });
  });

  describe('update size', function() {
    it('should evict header field from the table', function() {
      var value = new Buffer('localhost');
      var header = new Buffer([
        0b01000000 | 38,  // 38th element from static table
        value.length
      ]);

      decomp.write(Buffer.concat([ header, value ]));
      decomp.execute();
      var field = decomp.read();
      assert.equal(field.name, 'host');
      assert.equal(field.value, 'localhost');
      assert.equal(decomp._table.dynamic.length, 1);

      decomp.write(new Buffer([
        0b00100000
      ]));
      decomp.execute();

      assert.equal(decomp._table.dynamic.length, 0);
    });
  });

  describe('spec examples', function() {
    var decomp;
    beforeEach(function() {
      decomp = hpack.decompressor.create({
        table: {
          maxSize: 256
        }
      });
    });

    var tests = fixtures.specExamples;

    tests.forEach(function(test, i) {
      var prev = tests[i - 1];
      it('should give expected output on ' + test.id, function() {
        var startFrom = test.continuation ? prev.decomp : decomp;
        if (!startFrom)
          throw new Error('Previous test failed');
        decomp = startFrom;

        decomp.write(new Buffer(test.input.replace(/ /g, ''), 'hex'));
        decomp.execute();

        var output = [];
        for (;;) {
          var chunk = decomp.read();
          if (!chunk)
            break;

          output.push([ chunk.name, chunk.value ]);
        }

        assert.deepEqual(output, test.output);

        // Verify table contents
        assert.deepEqual(decomp._table.dynamic.map(function(header) {
          return [ header.name, header.value, header.totalSize ];
        }).reverse(), test.table);

        // Verify table size
        var expectedSize = test.table.reduce(function(acc, item) {
          return acc + item[2];
        }, 0);
        assert.equal(decomp._table.size, expectedSize);

        test.decomp = decomp;
      });
    });
  });
});
