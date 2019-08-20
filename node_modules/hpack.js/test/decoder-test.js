var assert = require('assert');
var hpack = require('../');

describe('hpack/decoder', function() {
  var decoder;

  beforeEach(function() {
    decoder = hpack.decoder.create();
  });

  describe('bit', function() {
    it('should decode number bit-by-bit', function() {
      decoder.push([ 0b11101010, 0b10101111 ]);
      var out = '';
      for (var i = 0; i < 16; i++)
        out += decoder.decodeBit();
      assert.equal(out, '11101010' + '10101111');
    });
  });

  describe('integer', function() {
    it('should decode 10 in prefix-5 (C.1.1)', function() {
      decoder.push([ 0b11101010 ]);
      decoder.skipBits(3);
      assert.equal(decoder.decodeInt(), 10);
    });

    it('should decode 1337 in prefix-5 (C.1.2)', function() {
      decoder.push([ 0b11111111, 0b10011010, 0b00001010 ]);
      decoder.skipBits(3);
      assert.equal(decoder.decodeInt(), 1337);
    });

    it('should decode 42 at octect boundary (C.1.3)', function() {
      decoder.push([ 0b00101010 ]);
      assert.equal(decoder.decodeInt(8), 42);
    });

    it('should throw on empty input', function() {
      assert.throws(function() {
        decoder.decodeInt();
      });
    });

    it('should throw on incomplete int', function() {
      decoder.push([ 0b11111111, 0b10011010 ]);
      decoder.skipBits(3);
      assert.throws(function() {
        decoder.decodeInt();
      });
    });

    it('should throw on overflowing int', function() {
      decoder.push([
        0b11111111,
        0b10011010,
        0b10011010,
        0b10011010,
        0b10011010,
        0b10011010
      ]);
      decoder.skipBits(3);
      assert.throws(function() {
        decoder.decodeInt();
      });
    });
  });

  describe('string', function() {
    it('should decode literal from (C.2.1)', function() {
      decoder.push([ 0x0a ]);
      decoder.push(new Buffer('custom-key'));

      assert.equal(decoder.decodeStr().toString(), 'custom-key');
    });

    it('should decode literal from (C.4.1)', function() {
      decoder.push(new Buffer(
        '8c' +
            'f1e3 c2e5 f23a 6ba0 ab90 f4ff'.replace(/ /g, ''),
        'hex'));

      assert.equal(new Buffer(decoder.decodeStr()).toString(),
                   'www.example.com');
    });

    it('should decode literal from (C.4.2)', function() {
      decoder.push(new Buffer(
        '86' +
            'a8eb 1064 9cbf'.replace(/ /g, ''),
        'hex'));

      assert.equal(new Buffer(decoder.decodeStr()).toString(), 'no-cache');
    });

    it('should decode literal from (C.4.3) #1', function() {
      decoder.push(new Buffer(
        '88' +
            '25a8 49e9 5ba9 7d7f'.replace(/ /g, ''),
        'hex'));

      assert.equal(new Buffer(decoder.decodeStr()).toString(), 'custom-key');
    });

    it('should decode literal from (C.4.3) #2', function() {
      decoder.push(new Buffer(
        '89' +
            '25a8 49e9 5bb8 e8b4 bf'.replace(/ /g, ''),
        'hex'));

      assert.equal(new Buffer(decoder.decodeStr()).toString(), 'custom-value');
    });

    it('should decode literal from (C.6.1) #1', function() {
      decoder.push(new Buffer(
        ('96' +
            'd07a be94 1054 d444 a820 0595 040b 8166' +
            'e082 a62d 1bff').replace(/ /g, ''),
        'hex'));

      assert.equal(new Buffer(decoder.decodeStr()).toString(),
                   'Mon, 21 Oct 2013 20:13:21 GMT');
    });

    it('should decode literal from (C.6.1) #2', function() {
      decoder.push(new Buffer(
        ('91' +
            '9d29 ad17 1863 c78f 0b97 c8e9 ae82 ae43' +
            'd3').replace(/ /g, ''),
        'hex'));
      assert.equal(new Buffer(decoder.decodeStr()).toString(),
                   'https://www.example.com');
    });

    it('should decode many 5 bit chars', function() {
      // e = 00101, 0x294A5294A5 = 00101 x 8
      decoder.push(new Buffer('85294A5294A5', 'hex'));
      assert.equal(new Buffer(decoder.decodeStr()).toString(), 'eeeeeeee');
    });

    it('should decode many 5 bit chars with 3-bit EOS', function() {
      // e = 00101, EOS=111,
      // 0x294A5294A52F = 00101 x 9 + 111
      decoder.push(new Buffer('86294A5294A52F', 'hex'));
      assert.equal(new Buffer(decoder.decodeStr()).toString(), 'eeeeeeeee');
    });

    it('should decode many 5 bit chars with 2-bit EOS', function() {
      // e = 00101, EOS=11,
      // 0x294A5297 = 00101 x 6 + 11
      decoder.push(new Buffer('84294A5297', 'hex'));
      assert.equal(new Buffer(decoder.decodeStr()).toString(), 'eeeeee');
    });

    it('should decode many multi-octet chars', function() {
      decoder.push(new Buffer(
          '97ffffb1ffff63fffec7fffd8ffffb1ffff63fffec7fffd8',
          'hex'));
      assert.deepEqual(decoder.decodeStr(), [
        1, 1, 1, 1, 1, 1, 1, 1
      ]);
    });

    it('should fail on 8 bit EOS', function() {
      // e = 00101, 0x294A5294A5 = 00101 x 8
      decoder.push(new Buffer('86294A5294A5ff', 'hex'));
      assert.throws(function() {
        decoder.decodeStr();
      });
    });

    it('should fail on invalid 2-bit EOS', function() {
      // e = 00101, EOS=10,
      // 0x294A5297 = 00101 x 6 + 11
      decoder.push(new Buffer('84294A5296', 'hex'));
      assert.throws(function() {
        decoder.decodeStr();
      });
    });
  });
});
